import { useState } from 'react';

import { Boards, Home, Profile, Search } from '../../../assets/icons';
import { UserProfile, WorkspaceCreator, WorkspaceSettings } from '../../components';
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

  const [editMode, setEditMode] = useState(false);

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        {workspaces.map((workspace) => (
          <div key={workspace.name} className={`workspace ${editMode && 'inactive-workspace'}`}>
            <img src={workspace.logo} alt={workspace.name} />
            <span>{workspace.name}</span>
          </div>
        ))}
        <WorkspaceCreator
          editMode={editMode}
          createHandler={() => {
            setEditMode((prev) => !prev);
            console.log('create workspace');
          }}
        />
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
