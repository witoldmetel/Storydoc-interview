import { useSelector } from 'react-redux';

import { ListCreator, ListItem } from '../../components';
import { selectListsFromActiveBoard } from '../../store/slices/listSlice';

import './Container.scss';

export const Container = () => {
  const lists = useSelector(selectListsFromActiveBoard);

  return (
    <div className="container">
      {lists.length ? lists.map((list) => <ListItem key={list.id} id={list.id} name={list.name} />) : null}

      <div>
        <ListCreator />
      </div>
    </div>
  );
};
