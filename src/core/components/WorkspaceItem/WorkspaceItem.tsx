import { WorkspaceType } from '../../store/types';

import './WorkspaceItem.scss';

type WorkspaceItemProps = {
  editMode: boolean;
  workspace: WorkspaceType;
  activeWorkspace: number;

  onClick: (workspaceId: number) => void;
};

export const WorkspaceItem = ({ editMode, workspace, activeWorkspace, onClick }: WorkspaceItemProps) => {
  return (
    <div
      className={`workspace-item ${editMode && 'inactive-workspace'} ${
        workspace.createdAt === activeWorkspace && 'active-workspace'
      }`}
      onClick={() => onClick(workspace.createdAt)}
    >
      {workspace.logo ? (
        <img src={workspace.logo} alt={workspace.name} />
      ) : (
        <span className="initials">{workspace.initials}</span>
      )}
      <span>{workspace.name}</span>
    </div>
  );
};
