import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { nanoid } from '@reduxjs/toolkit';

import { selectActiveBoardId } from '../../../store/slices/boardSlice';
import { addTask } from '../../../store/slices/taskSlice';
import { AppDispatch } from '../../../store/store';
import { CreateTaskButton } from '../CreateTaskButton/CreateTaskButton';
import { EditableTaskItem } from '../EditableTaskItem/EditableTaskItem';

type TaskCreator = {
  listId?: string;
};

export const TaskCreator = ({ listId }: TaskCreator) => {
  const dispatch = useDispatch<AppDispatch>();
  const activeBoardId = useSelector(selectActiveBoardId);

  const [createMode, setCreateMode] = useState(false);

  return (
    <>
      {createMode ? (
        <EditableTaskItem
          confirmHandler={(taskName) => {
            if (listId) {
              dispatch(
                addTask({
                  id: nanoid(),
                  listId,
                  boardId: activeBoardId!,
                  name: taskName,
                })
              );
            }
          }}
          callback={() => setCreateMode(false)}
        />
      ) : null}
      <CreateTaskButton placeholder="Add a card" onClick={() => setCreateMode(true)} />
    </>
  );
};
