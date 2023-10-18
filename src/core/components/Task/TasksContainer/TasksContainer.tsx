import { useDispatch, useSelector } from 'react-redux';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { nanoid } from '@reduxjs/toolkit';

import { selectActiveBoardId } from '../../../store/slices/boardSlice';
import { addTask, selectTasksFromList } from '../../../store/slices/taskSlice';
import { AppDispatch } from '../../../store/store';
import { DRAGGABLE_TYPE } from '../../../store/types';
import { SortableItem } from '../../SortableItem/SortableItem';
import { TaskCreator } from '../TaskCreator/TaskCreator';
import { TaskItem } from '../TaskItem/TaskItem';

type TasksContainerProps = {
  listId: string;
};

export const TasksContainer = ({ listId }: TasksContainerProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const activeBoardId = useSelector(selectActiveBoardId);
  const tasks = useSelector((state) => selectTasksFromList(state, listId));

  return (
    <>
      <SortableContext items={tasks} strategy={verticalListSortingStrategy}>
        {tasks.length
          ? tasks.map((task) => (
              <SortableItem key={task.id} id={task.id} type={DRAGGABLE_TYPE.TASK} additionalData={task}>
                <TaskItem item={task} />
              </SortableItem>
            ))
          : null}
      </SortableContext>
      <TaskCreator
        placeholder="Add a card"
        taskConfirmHandler={(taskName) => {
          dispatch(
            addTask({
              id: nanoid(),
              listId,
              boardId: activeBoardId!,
              name: taskName,
            })
          );
        }}
      />
    </>
  );
};
