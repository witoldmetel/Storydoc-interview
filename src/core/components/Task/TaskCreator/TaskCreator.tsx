import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { addTask } from '../../../store/slices/taskSlice';
import { AppDispatch } from '../../../store/store';
import { CreateTaskButton } from '../CreateTaskButton/CreateTaskButton';
import { EditableTaskItem } from '../EditableTaskItem/EditableTaskItem';

type TaskCreator = {
  listId?: string;
};

export const TaskCreator = ({ listId }: TaskCreator) => {
  const dispatch = useDispatch<AppDispatch>();

  const [createMode, setCreateMode] = useState(false);

  return (
    <>
      {createMode ? (
        <EditableTaskItem
          confirmHandler={(taskName) => {
            if (listId) {
              dispatch(
                addTask({
                  listId,
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
