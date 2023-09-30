import { useState } from 'react';

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

  const [activeWorkspace, setActiveWorkspace] = useState(workspaces[0].createdAt);
  const [editMode, setEditMode] = useState(false);

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="workspaces-wrapper" style={{ maxHeight: editMode ? '80%' : '94%' }}>
          {workspaces.map((workspace) => (
            <WorkspaceItem
              key={workspace.createdAt}
              editMode={editMode}
              workspace={workspace}
              activeWorkspace={activeWorkspace}
              onClick={(id: number) => setActiveWorkspace(id)}
            />
          ))}
        </div>
        <WorkspaceCreator
          editMode={editMode}
          callback={(workspaceId) => {
            setEditMode((prev) => !prev);
            workspaceId && setActiveWorkspace(workspaceId);
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
