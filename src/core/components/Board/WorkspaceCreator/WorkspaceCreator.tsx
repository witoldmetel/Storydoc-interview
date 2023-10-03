import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { clsx } from 'clsx';

import { Plus, Tick } from '../../../../assets/icons';
import { createBoard } from '../../../store/slices/boardSlice';
import { Button } from '../../Button/Button';
import { EditableWorkspaceItem } from '../EditableWorkspaceItem/EditableWorkspaceItem';

import './WorkspaceCreator.scss';

type WorkspaceCreatorProps = {
  createMode: boolean;

  callback: (workspaceId?: number) => void;
};

export const WorkspaceCreator = ({ createMode, callback }: WorkspaceCreatorProps) => {
  const dispatch = useDispatch();

  const [workspaceName, setWorkspaceName] = useState('');

  const isButtonDisabled = createMode ? workspaceName.trim() === '' : false;

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWorkspaceName(event.target.value);
  };

  const handleWorkspaceCreate = () => {
    if (createMode) {
      dispatch(createBoard({ name: workspaceName }));
      setWorkspaceName('');
    }

    callback();
  };

  const handleInputKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.code === 'Enter') {
      handleWorkspaceCreate();
    }
  };

  return (
    <>
      {createMode ? (
        <EditableWorkspaceItem
          workspaceName={workspaceName}
          handleInputChange={handleInputChange}
          onKeyDown={handleInputKeyPress}
        />
      ) : null}
      <Button
        onClick={handleWorkspaceCreate}
        disabled={isButtonDisabled}
        className={clsx({ 'create-mode': createMode }, { disabled: isButtonDisabled }, { enabled: !isButtonDisabled })}
      >
        <div className="workspace-content">
          {createMode ? <Tick color={isButtonDisabled ? '#594F78' : '#FFF'} /> : <Plus />}
          <p className="workspace-content-name">{createMode ? 'Save new workspace' : 'Create workspace'}</p>
        </div>
      </Button>
    </>
  );
};
