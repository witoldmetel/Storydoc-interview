import { useSelector } from 'react-redux';

import { ListCreator, ListItem } from '../../components';
import { selectActiveBoardId } from '../../store/slices/boardSlice';
import { selectListsFromActiveBoard } from '../../store/slices/listSlice';

import './Container.scss';

export const Container = () => {
  const activeBoardId = useSelector(selectActiveBoardId);
  const lists = useSelector(selectListsFromActiveBoard);

  return activeBoardId !== undefined ? (
    <div className="container">
      {lists.length ? lists.map((list) => <ListItem key={list.id} id={list.id} name={list.name} />) : null}

      <div>
        <ListCreator />
      </div>
    </div>
  ) : (
    <p className="empty-container">Select workspace or create one</p>
  );
};
