import { useEffect, useState } from 'react';
import {
  closestCorners,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useDroppable,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { clsx } from 'clsx';

import { useAppSelector } from '../../../store/store';
import { BoardItem } from '../BoardItem/BoardItem';

import './BoardsContainer.scss';

type BoardsContainerProps = {
  createMode: boolean;
};

export const BoardsContainer = ({ createMode }: BoardsContainerProps) => {
  const boards = useAppSelector((state) => state.board);
  const { setNodeRef } = useDroppable({ id: 'boards-drop-area' });
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const [items, setItems] = useState(boards);

  useEffect(() => {
    setItems(boards);
  }, [boards]);

  // @todo: Add proper type
  function handleDragEnd(event: any) {
    const { active, over } = event;

    if (active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.indexOf(active.id);
        const newIndex = items.indexOf(over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }

  return (
    <DndContext sensors={sensors} collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
      <SortableContext id="boards-drop-area" items={items} strategy={verticalListSortingStrategy}>
        <div ref={setNodeRef} className={clsx('boards-container', { createMode: createMode })}>
          {items.length
            ? items.map((board) => (
                // <SortableItem key={board.id} id={board.id}>
                <BoardItem key={board.id} board={board} />
                // </SortableItem>
              ))
            : null}
        </div>
      </SortableContext>
    </DndContext>
  );
};
