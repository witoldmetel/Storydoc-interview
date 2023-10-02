import { ListCreator } from '../../components';

import './Container.scss';

export const Container = () => {
  return (
    <div className="container">
      <div>
        <div className="container__board">
          <h1>Board One</h1>

          <div className="container__board__card">
            <p>Card #1</p>
          </div>
          <div className="container__board__card">
            <p>Card #2</p>
          </div>
        </div>
      </div>

      <div>
        <div className="container__board">
          <h1>Board Two</h1>
          <div className="container__board__card">
            <p>Card #1</p>
          </div>
          <div className="container__board__card">
            <p>Card #1</p>
          </div>
          <div className="container__board__card">
            <p>Card #1</p>
          </div>
          <div className="container__board__card">
            <p>Card #1</p>
          </div>
        </div>
      </div>

      <div>
        <div className="container__board">
          <h1>Board Three</h1>
          <div className="container__board__card">
            <p>Card #1</p>
          </div>
          <div className="container__board__card">
            <p>Card #1</p>
          </div>
          <div className="container__board__card">
            <p>Card #1</p>
          </div>
        </div>
      </div>
      <div>
        <ListCreator />
      </div>
    </div>
  );
};
