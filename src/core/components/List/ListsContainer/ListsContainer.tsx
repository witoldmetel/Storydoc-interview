import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  closestCenter,
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { arrayMove, horizontalListSortingStrategy, SortableContext } from '@dnd-kit/sortable';

import { reorderLists, selectListsFromActiveBoard } from '../../../store/slices/listSlice';
import { reorderTasks } from '../../../store/slices/taskSlice';
import { AppDispatch, useAppSelector } from '../../../store/store';
import { DRAGGABLE_TYPE, ListType, TaskType } from '../../../store/types';
import { SortableItem } from '../../SortableItem/SortableItem';
import { TaskItem } from '../../Task';
import { ListItem } from '../ListItem/ListItem';

export const ListsContainer = () => {
  const dispatch = useDispatch<AppDispatch>();
  const lists = useSelector(selectListsFromActiveBoard);
  const tasks = useAppSelector((state) => state.task);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  );

  // It means that user start to drag item
  const [activeList, setActiveList] = useState<ListType | null>(null);
  const [activeTask, setActiveTask] = useState<TaskType | null>(null);

  const onDragStart = (event: DragStartEvent) => {
    if (event.active.data.current?.type === DRAGGABLE_TYPE.LIST) {
      setActiveList(event.active.data.current?.additionalData);
    }

    if (event.active.data.current?.type === DRAGGABLE_TYPE.TASK) {
      setActiveTask(event.active.data.current?.additionalData);
    }
  };

  const onDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveTask = active.data.current?.type === DRAGGABLE_TYPE.TASK;
    const isOverTask = over.data.current?.type === DRAGGABLE_TYPE.TASK;
    // const isOverList = over.data.current?.type === DRAGGABLE_TYPE.LIST;

    if (!isActiveTask) {
      return;
    } else {
      const oldIndex = tasks.findIndex((task) => task.id === activeId);

      if (isOverTask) {
        const newIndex = tasks.findIndex((task) => task.id === overId);
        const newOrder = arrayMove(tasks, oldIndex, newIndex);

        dispatch(reorderTasks(newOrder));
      }

      // if (isOverList) {
      //   tasks[oldIndex].list = overId as string;

      //   const newOrder = arrayMove(tasks, oldIndex, oldIndex);

      //   dispatch(reorderTasks(newOrder));
      // }
    }
  };

  const onDragEnd = (event: DragEndEvent) => {
    setActiveList(null);
    setActiveTask(null);

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
      onDragOver={onDragOver}
      onDragEnd={onDragEnd}
    >
      <SortableContext items={lists} strategy={horizontalListSortingStrategy}>
        {lists.length
          ? lists.map((list) => (
              <SortableItem key={list.id} id={list.id} type={DRAGGABLE_TYPE.LIST} additionalData={list}>
                <ListItem list={list} />
              </SortableItem>
            ))
          : null}
      </SortableContext>
      <DragOverlay>
        {activeList && <ListItem list={activeList} isDragging />}
        {activeTask && <TaskItem item={activeTask} isDragging />}
      </DragOverlay>
    </DndContext>
  );
};
