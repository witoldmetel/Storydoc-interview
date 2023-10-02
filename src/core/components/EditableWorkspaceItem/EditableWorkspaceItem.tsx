import { getWorkspaceInitials } from '../utils';

import './EditableWorkspaceItem.scss';

type EditableWorkspaceItemProps = {
  workspaceName: string;
  workspaceLogo?: string;

  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: VoidFunction;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
};

export const EditableWorkspaceItem = ({
  workspaceName,
  workspaceLogo,
  handleInputChange,
  onBlur,
  onKeyDown,
}: EditableWorkspaceItemProps) => {
  return (
    <div className="workspace-input">
      {workspaceLogo ? (
        <img src={workspaceLogo} alt={workspaceName} />
      ) : (
        <span className="logo">{getWorkspaceInitials(workspaceName)}</span>
      )}
      <input
        type="text"
        className="input-name"
        placeholder={workspaceName ? workspaceName : 'Workspace name'}
        maxLength={28}
        value={workspaceName}
        onChange={handleInputChange}
        onBlur={onBlur}
        onKeyDown={onKeyDown}
        autoFocus
      />
    </div>
  );
};
