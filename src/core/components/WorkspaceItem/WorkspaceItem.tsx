import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { clsx } from 'clsx';

import { useHover } from '../../hooks/useHover';
import { deleteBoard, setActiveBoard, updateBoard } from '../../store/slices/boardSlice';
import { WorkspaceType } from '../../store/types';
import { ActionButtons } from '../ActionButtons/ActionButtons';
import { EditableWorkspaceItem } from '../EditableWorkspaceItem/EditableWorkspaceItem';

import './WorkspaceItem.scss';

type WorkspaceItemProps = {
  workspace: WorkspaceType;
};

export const WorkspaceItem = ({ workspace }: WorkspaceItemProps) => {
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
    if (workspaceName) {
      dispatch(updateBoard({ id: workspace.id, newName: workspaceName }));
    }

    setEditMode(false);
  };

  const handleInputKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.code === 'Enter') {
      onConfirmUpdate();
    }
  };

  return editMode ? (
    <EditableWorkspaceItem
      workspaceName={workspaceName}
      workspaceLogo={workspace.logo}
      handleInputChange={handleInputChange}
      onBlur={onConfirmUpdate}
      onKeyDown={handleInputKeyPress}
    />
  ) : (
    <div
      className={clsx(
        'workspace-item',
        { hovered: isHovering && !editMode },
        { 'inactive-workspace': editMode },
        { 'active-workspace': workspace.isActive }
      )}
      onClick={() => dispatch(setActiveBoard(workspace.id))}
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
