import { Boards, Home, Plus, Profile, Search } from '../../../assets/icons';
import { Button, UserProfile, WorkspaceSettings } from '../../components';

import './Sidebar.scss';

export const Sidebar = () => {
  const menuItems = [
    { title: 'Dashboard', icon: <Home />, isActive: false },
    { title: 'Boards', icon: <Boards />, isActive: true },
    { title: 'Profile', icon: <Profile />, isActive: false },
    { title: 'Search', icon: <Search />, isActive: false },
  ];

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
      <div className="sidebar-main">
        {menuItems.map((item) => (
          <div key={item.title} className="menu-item">
            {item.icon}
            <p className={`menu-item-title ${item.isActive && 'active'}`}>{item.title}</p>
          </div>
        ))}
      </div>
      <div className="sidebar-footer">
        <UserProfile />
        <WorkspaceSettings />
      </div>
    </div>
  );
};
