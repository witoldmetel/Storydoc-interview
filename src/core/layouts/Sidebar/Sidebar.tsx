import { useState } from 'react';
import { clsx } from 'clsx';

import { Boards, Home, Profile, Search } from '../../../assets/icons';
import { UserProfile, WorkspaceCreator, WorkspaceItem, WorkspaceSettings } from '../../components';
import { useAppSelector } from '../../store/store';

import './Sidebar.scss';

const menuItems = [
  { title: 'Dashboard', icon: <Home />, isActive: false },
  { title: 'Boards', icon: <Boards />, isActive: true },
  { title: 'Profile', icon: <Profile />, isActive: false },
  { title: 'Search', icon: <Search />, isActive: false },
];

export const Sidebar = () => {
  const workspaces = useAppSelector((state) => state.board);

  const [createMode, setCreateMode] = useState(false);

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="workspaces-wrapper" style={{ maxHeight: createMode ? '80%' : '94%' }}>
          {workspaces.length
            ? workspaces.map((workspace) => <WorkspaceItem key={workspace.id} workspace={workspace} />)
            : null}
        </div>
        <WorkspaceCreator createMode={createMode} callback={() => setCreateMode((prev) => !prev)} />
      </div>
      <div className="sidebar-main">
        {menuItems.map((item) => (
          <div key={item.title} className="menu-item">
            {item.icon}
            <p className={clsx('menu-item-title', { active: item.isActive })}>{item.title}</p>
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
