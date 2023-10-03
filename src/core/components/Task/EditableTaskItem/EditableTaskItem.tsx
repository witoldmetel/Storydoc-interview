import React, { useState } from 'react';

import './EditableTaskItem.scss';

type EditableTaskItemProps = {
  name?: string;

  confirmHandler: (name: string) => void;
  callback: VoidFunction;
};

export const EditableTaskItem = ({ name, confirmHandler, callback }: EditableTaskItemProps) => {
  const [taskName, setTaskName] = useState(name ?? '');

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
    <input
      type="text"
      className="task-input"
      placeholder="Title of the new card..."
      maxLength={28}
      value={taskName}
      onChange={handleInputChange}
      onBlur={createNewCard}
      onKeyDown={handleInputKeyPress}
      autoFocus
    />
  );
};
