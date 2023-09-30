import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { Plus, Tick } from '../../../assets/icons';
import { addBoard } from '../../store/slices/boardSlice';
import { Button } from '../Button/Button';

import './WorkspaceCreator.scss';

type WorkspaceCreatorProps = {
  editMode: boolean;

  callback: (workspaceId?: number) => void;
};

export const WorkspaceCreator = ({ editMode, callback }: WorkspaceCreatorProps) => {
  const dispatch = useDispatch();

  const [workspaceName, setWorkspaceName] = useState('');

  const workspaceInitials = workspaceName ? workspaceName.charAt(0).toUpperCase() : '';
  const isButtonDisabled = editMode ? workspaceName.trim() === '' : false;

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWorkspaceName(event.target.value);
  };

  const handleWorkspaceCreate = () => {
    if (editMode) {
      const date = new Date();
      const workspaceId = date.getTime();

      dispatch(addBoard({ name: workspaceName, initials: workspaceInitials, createdAt: workspaceId }));
      setWorkspaceName('');
      callback(workspaceId);
    } else {
      callback();
    }
  };

  return (
    <>
      {editMode ? (
        <div className="workspace-creator">
          <span className="logo">{workspaceInitials}</span>
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
        onClick={handleWorkspaceCreate}
        disabled={isButtonDisabled}
        className={`${editMode && 'edit-mode'} ${isButtonDisabled ? 'disabled' : 'enabled'}`}
      >
        <div className="workspace-content">
          {editMode ? <Tick color={isButtonDisabled ? '#594F78' : '#FFF'} /> : <Plus />}
          <p className="workspace-content-name">{editMode ? 'Save new workspace' : 'Create workspace'}</p>
        </div>
      </Button>
    </>
  );
};
