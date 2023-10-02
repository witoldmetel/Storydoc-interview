import { ListCreator } from '../../components';

import './Container.scss';

export const Container = () => {
  return (
    <div className="container">
      <div className="container__board">
        <h1>Board One</h1>

        <div className="container__board__card">Card #1</div>
        <div className="container__board__card">Card #2</div>
      </div>
      <div className="container__board">
        <h1>Board Two</h1>

        <div className="container__board__card">Card #1</div>
        <div className="container__board__card">Card #2</div>
        <div className="container__board__card">Card #3</div>
        <div className="container__board__card">Card #4</div>
      </div>
      <div className="container__board">
        <h1>Board Three</h1>

        <div className="container__board__card">Card #1</div>
        <div className="container__board__card">Card #2</div>
        <div className="container__board__card">Card #3</div>
      </div>
      <ListCreator />
    </div>
  );
};
