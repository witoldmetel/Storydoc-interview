import { useState } from 'react';

import { CreateTaskButton } from '../CreateTaskButton/CreateTaskButton';
import { EditableTaskItem } from '../EditableTaskItem/EditableTaskItem';

type TaskCreator = {
  placeholder: string;

  taskConfirmHandler: (name: string) => void;
};

export const TaskCreator = ({ placeholder, taskConfirmHandler }: TaskCreator) => {
  const [createMode, setCreateMode] = useState(false);

  return (
    <>
      {createMode ? (
        <EditableTaskItem confirmHandler={taskConfirmHandler} callback={() => setCreateMode(false)} />
      ) : null}
      <CreateTaskButton placeholder={placeholder} onClick={() => setCreateMode(true)} />
    </>
  );
};
