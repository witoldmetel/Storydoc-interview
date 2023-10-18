import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  closestCorners,
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { arrayMove, SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { clsx } from 'clsx';

import { reorderBoards } from '../../../store/slices/boardSlice';
import { AppDispatch, useAppSelector } from '../../../store/store';
import { BoardType, DRAGGABLE_TYPE } from '../../../store/types';
import { SortableItem } from '../../SortableItem/SortableItem';
import { BoardItem } from '../BoardItem/BoardItem';

import './BoardsContainer.scss';

type BoardsContainerProps = {
  createMode: boolean;
};

export const BoardsContainer = ({ createMode }: BoardsContainerProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const { boards } = useAppSelector((state) => state.board);
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  );

  // It means that user start to drag item
  const [activeBoard, setActiveBoard] = useState<BoardType | null>(null);

  const onDragStart = (event: DragStartEvent) => {
    if (event.active.data.current?.type === DRAGGABLE_TYPE.BOARD) {
      setActiveBoard(event.active.data.current?.additionalData);
    }
  };

  const onDragEnd = (event: DragEndEvent) => {
    setActiveBoard(null);

    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = boards.findIndex((board) => board.id === active.id);
      const newIndex = boards.findIndex((board) => board.id === over.id);
      const newOrder = arrayMove(boards, oldIndex, newIndex);

      dispatch(reorderBoards(newOrder));
    }
  };

  return (
    <DndContext sensors={sensors} collisionDetection={closestCorners} onDragEnd={onDragEnd} onDragStart={onDragStart}>
      <SortableContext id="boards-drop-area" items={boards} strategy={verticalListSortingStrategy}>
        <div className={clsx('boards-container', { createMode: createMode })}>
          {boards.length
            ? boards.map((board) => (
                <SortableItem key={board.id} id={board.id} type={DRAGGABLE_TYPE.BOARD} additionalData={board}>
                  <BoardItem board={board} />
                </SortableItem>
              ))
            : null}
        </div>
      </SortableContext>
      <DragOverlay>{activeBoard && <BoardItem board={activeBoard} isDragging />}</DragOverlay>
    </DndContext>
  );
};
