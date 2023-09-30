import { Plus } from '../../../assets/icons';
import { Button, UserProfile, WorkspaceSettings } from '../../components';

import './Sidebar.scss';

export const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <Button onClick={() => console.log('wow')}>
          <div className="workspace-button">
            <Plus />
            <p className="workspace-button-content">Create workspace</p>
          </div>
        </Button>
      </div>
      <div className="sidebar-main"></div>
      <div className="sidebar-footer">
        <UserProfile />
        <WorkspaceSettings />
      </div>
    </div>
  );
};
