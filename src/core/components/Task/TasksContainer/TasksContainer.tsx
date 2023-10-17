import { useDispatch, useSelector } from 'react-redux';
import { nanoid } from '@reduxjs/toolkit';

import { selectActiveBoardId } from '../../../store/slices/boardSlice';
import { addTask, selectTasksFromList } from '../../../store/slices/taskSlice';
import { AppDispatch } from '../../../store/store';
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
      {tasks.length ? tasks.map((task) => <TaskItem key={task.id} item={task} />) : null}
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
