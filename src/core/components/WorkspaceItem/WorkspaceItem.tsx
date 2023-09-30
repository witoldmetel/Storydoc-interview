import { clsx } from 'clsx';

import { useHover } from '../../hooks/useHover';
import { WorkspaceType } from '../../store/types';
import { ActionButtons } from '../ActionButtons/ActionButtons';

import './WorkspaceItem.scss';

type WorkspaceItemProps = {
  editMode: boolean;
  workspace: WorkspaceType;
  activeWorkspace: number;

  onClick: (workspaceId: number) => void;
};

export const WorkspaceItem = ({ editMode, workspace, activeWorkspace, onClick }: WorkspaceItemProps) => {
  const [isHovering, handleMouseOver, handleMouseOut] = useHover();

  return (
    <div
      className={clsx(
        'workspace-item',
        { hovered: isHovering && !editMode },
        { 'inactive-workspace': editMode },
        { 'active-workspace': workspace.createdAt === activeWorkspace }
      )}
      onClick={() => onClick(workspace.createdAt)}
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
        <ActionButtons onEditClick={() => console.log('edit')} onDeleteClick={() => console.log('delete')} />
      ) : null}
    </div>
  );
};
