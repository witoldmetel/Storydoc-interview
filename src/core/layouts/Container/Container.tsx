import { useSelector } from 'react-redux';

import { List, ListCreator } from '../../components';
import { selectListsFromActiveBoard } from '../../store/slices/listSlice';

import './Container.scss';

export const Container = () => {
  const lists = useSelector(selectListsFromActiveBoard);

  return (
    <div className="container">
      {lists.length
        ? lists.map((list) => <List key={list.id} id={list.id} name={list.name} cards={list.cards} />)
        : null}

      <div>
        <ListCreator />
      </div>
    </div>
  );
};
