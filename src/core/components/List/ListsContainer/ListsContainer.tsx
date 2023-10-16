import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { arrayMove, horizontalListSortingStrategy, SortableContext } from '@dnd-kit/sortable';

import { reorderLists, selectListsFromActiveBoard } from '../../../store/slices/listSlice';
import { AppDispatch } from '../../../store/store';
import { DRAGGABLE_TYPE, ListType } from '../../../store/types';
import { SortableItem } from '../../SortableItem/SortableItem';
import { ListItem } from '../ListItem/ListItem';

export const ListsContainer = () => {
  const dispatch = useDispatch<AppDispatch>();
  const lists = useSelector(selectListsFromActiveBoard);
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  );

  // It means that user start to drag item
  const [activeList, setActiveList] = useState<ListType | null>(null);

  const onDragStart = (event: DragStartEvent) => {
    if (event.active.data.current?.type === DRAGGABLE_TYPE.LIST) {
      setActiveList(event.active.data.current?.additionalData);
    }
  };

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = lists.findIndex((board) => board.id === active.id);
      const newIndex = lists.findIndex((board) => board.id === over.id);
      const newOrder = arrayMove(lists, oldIndex, newIndex);

      dispatch(reorderLists(newOrder));
    }
  };

  return (
    <DndContext
      id="lists-drop-area"
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    >
      <SortableContext items={lists} strategy={horizontalListSortingStrategy}>
        {lists.length
          ? lists.map((list) => (
              <SortableItem key={list.id} id={list.id} type={DRAGGABLE_TYPE.LIST}>
                <ListItem id={list.id} name={list.name} />
              </SortableItem>
            ))
          : null}
      </SortableContext>
      <DragOverlay>{activeList && <ListItem id={activeList.id} name={activeList.name} />}</DragOverlay>
    </DndContext>
  );
};
