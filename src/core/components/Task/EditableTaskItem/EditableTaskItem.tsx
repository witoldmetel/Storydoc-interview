import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { addSubtask } from '../../../store/slices/taskSlice';
import { CreateTaskButton } from '../CreateTaskButton/CreateTaskButton';

import './EditableTaskItem.scss';

type EditableTaskItemProps = {
  taskId?: number;
  name?: string;

  confirmHandler: (name: string) => void;
  callback: VoidFunction;
};

export const EditableTaskItem = ({ taskId, name, confirmHandler, callback }: EditableTaskItemProps) => {
  const dispatch = useDispatch();

  const [taskName, setTaskName] = useState(name ?? '');
  const [createSubtaskMode, setCreateSubtaskMode] = useState(false);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTaskName(event.target.value);
  };

  const createNewCard = () => {
    if (taskName) {
      confirmHandler(taskName);
      setTaskName('');
    }

    callback();
  };

  const handleInputKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.code === 'Enter') {
      createNewCard();
    }
  };

  return (
    <>
      <input
        type="text"
        className="task-input"
        placeholder="Title of the new card..."
        maxLength={28}
        value={taskName}
        onChange={handleInputChange}
        // onBlur={createNewCard}
        onKeyDown={handleInputKeyPress}
        autoFocus
      />
      {createSubtaskMode ? (
        <EditableTaskItem
          confirmHandler={(taskName) => {
            if (taskId) {
              dispatch(
                addSubtask({
                  taskId,
                  name: taskName,
                })
              );
            }
          }}
          callback={() => setCreateSubtaskMode(false)}
        />
      ) : null}
      <CreateTaskButton placeholder="Add a subtask" onClick={() => setCreateSubtaskMode(true)} />
    </>
  );
};
