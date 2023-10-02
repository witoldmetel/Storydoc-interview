import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { clsx } from 'clsx';

import { useHover } from '../../hooks/useHover';
import { deleteBoard, updateBoard } from '../../store/slices/boardSlice';
import { WorkspaceType } from '../../store/types';
import { ActionButtons } from '../ActionButtons/ActionButtons';
import { Button } from '../Button/Button';
import { EditableWorkspaceItem } from '../EditableWorkspaceItem/EditableWorkspaceItem';

import './WorkspaceItem.scss';

type WorkspaceItemProps = {
  workspace: WorkspaceType;
  activeWorkspace: number;

  onClickItem: (workspaceId: number) => void;
};

export const WorkspaceItem = ({ workspace, activeWorkspace, onClickItem }: WorkspaceItemProps) => {
  const dispatch = useDispatch();
  const [isHovering, handleMouseOver, handleMouseOut] = useHover();

  const [editMode, setEditMode] = useState(false);
  const [workspaceName, setWorkspaceName] = useState(workspace.name ?? '');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWorkspaceName(event.target.value);
  };

  const onDeleteClick = () => {
    dispatch(deleteBoard(workspace.id));
  };

  const onConfirmUpdate = () => {
    dispatch(updateBoard({ id: workspace.id, newName: workspaceName }));
    setEditMode(false);
  };

  const onRejectUpdate = () => {
    setEditMode(false);
  };

  return editMode ? (
    <>
      <EditableWorkspaceItem
        workspaceName={workspaceName}
        workspaceLogo={workspace.logo}
        handleInputChange={handleInputChange}
      />
      <div className="action-buttons-edit-mode">
        <Button
          onClick={onConfirmUpdate}
          disabled={!workspaceName}
          className={clsx('action-button', 'update', { disabled: !workspaceName })}
        >
          Update
        </Button>
        <Button onClick={onRejectUpdate} className={clsx('action-button', 'reject', { disabled: !workspaceName })}>
          Reject
        </Button>
      </div>
    </>
  ) : (
    <div
      className={clsx(
        'workspace-item',
        { hovered: isHovering && !editMode },
        { 'inactive-workspace': editMode },
        { 'active-workspace': workspace.id === activeWorkspace }
      )}
      onClick={() => onClickItem(workspace.id)}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      <div className="workspace-item-content">
        {workspace.logo ? (
          <img src={workspace.logo} alt={workspace.name} />
        ) : (
          <span className="initials">{workspace.initials}</span>
        )}
        <span className={clsx({ hovered: isHovering && !editMode })}>{workspace.name}</span>
      </div>

      {isHovering && !editMode ? (
        <ActionButtons onEditClick={() => setEditMode(true)} onDeleteClick={onDeleteClick} />
      ) : null}
    </div>
  );
};
