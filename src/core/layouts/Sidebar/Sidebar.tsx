import { useState } from 'react';
import { clsx } from 'clsx';

import { Boards, Home, Profile, Search, Settings } from '../../../assets/icons';
import { BoardCreator, BoardItem, UserProfile } from '../../components';
import { useAppSelector } from '../../store/store';

import './Sidebar.scss';

const menuItems = [
  { title: 'Dashboard', icon: <Home />, isActive: false },
  { title: 'Boards', icon: <Boards />, isActive: true },
  { title: 'Profile', icon: <Profile />, isActive: false },
  { title: 'Search', icon: <Search />, isActive: false },
];

export const Sidebar = () => {
  const boards = useAppSelector((state) => state.board);

  const [createMode, setCreateMode] = useState(false);

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="boards-wrapper" style={{ maxHeight: createMode ? '80%' : '94%' }}>
          {boards.length ? boards.map((board) => <BoardItem key={board.id} board={board} />) : null}
        </div>
        <BoardCreator createMode={createMode} callback={() => setCreateMode((prev) => !prev)} />
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
        <button className="workspace-settings">
          <Settings />
        </button>
      </div>
    </div>
  );
};
