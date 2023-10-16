import { useSelector } from 'react-redux';

import { ListCreator, ListsContainer } from '../../components';
import { selectActiveBoardId } from '../../store/slices/boardSlice';

import './Container.scss';

export const Container = () => {
  const activeBoardId = useSelector(selectActiveBoardId);

  return activeBoardId != null ? (
    <div className="container">
      <ListsContainer />

      <div>
        <ListCreator />
      </div>
    </div>
  ) : (
    <p className="empty-container">Select workspace or create one</p>
  );
};
