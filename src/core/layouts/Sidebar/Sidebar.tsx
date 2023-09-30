import { Button, UserProfile, WorkspaceSettings } from '../../components';

import './Sidebar.scss';

export const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <Button onClick={() => console.log('wow')}>Example</Button>
      </div>
      <div className="sidebar-main"></div>
      <div className="sidebar-footer">
        <UserProfile />
        <WorkspaceSettings />
      </div>
    </div>
  );
};
