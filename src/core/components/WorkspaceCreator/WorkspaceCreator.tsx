import { useState } from 'react';

import { Plus, Tick } from '../../../assets/icons';
import { Button } from '../Button/Button';

import './WorkspaceCreator.scss';

type WorkspaceCreatorProps = {
  editMode: boolean;

  createHandler: VoidFunction;
};

export const WorkspaceCreator = ({ editMode, createHandler }: WorkspaceCreatorProps) => {
  const [workspaceName, setWorkspaceName] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWorkspaceName(event.target.value);
  };

  const initials = workspaceName ? workspaceName.charAt(0).toUpperCase() : '';
  const isButtonDisabled = editMode ? workspaceName.trim() === '' : false;

  return (
    <>
      {editMode ? (
        <div className="workspace-creator">
          <span className="logo">{initials}</span>
          <input
            type="text"
            className="input-name"
            placeholder="Workspace name"
            maxLength={28}
            value={workspaceName}
            onChange={handleInputChange}
          />
        </div>
      ) : null}
      <Button
        onClick={() => {
          createHandler();
          setWorkspaceName('');
        }}
        disabled={isButtonDisabled}
        className={`${editMode && 'edit-mode'} ${isButtonDisabled ? 'disabled' : 'enabled'}`}
      >
        <div className="workspace-content">
          {editMode ? <Tick color={isButtonDisabled ? '#594F78' : '#FFF'} /> : <Plus />}
          <p className="workspace-content-name">Create workspace</p>
        </div>
      </Button>
    </>
  );
};
