import { ListCreator } from '../../components';
import { useListsFromActiveBoard } from '../../store/slices/listSlice';

import './Container.scss';

export const Container = () => {
  const lists = useListsFromActiveBoard();

  return (
    <div className="container">
      {lists.length ? lists.map((list) => <p key={list.id}>{list.name}</p>) : null}
      {/* <div>
        <div className="container__board">
          <h1>Board One</h1>

          <div className="container__board__card">
            <p>Card #1</p>
          </div>
          <div className="container__board__card">
            <p>Card #2</p>
          </div>
        </div>
      </div> */}

      <div>
        <ListCreator />
      </div>
    </div>
  );
};
