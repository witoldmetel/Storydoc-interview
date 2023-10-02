import { Plus } from '../../../assets/icons';
import { Button } from '../Button/Button';

import './List.scss';

type ListProps = {
  name: string;

  cards: any;
};

export const List = ({ name, cards }: ListProps) => {
  return (
    <div>
      <div className="list">
        <h1>{name}</h1>

        {cards.length
          ? cards.map((card: any) => (
              <div key={card.id} className="list__card">
                <p>Card #1</p>
              </div>
            ))
          : null}
        <Button onClick={() => console.log('wow')} className="button-card-creator">
          <div className="card-creator-content">
            <Plus color="#88819f" />
            <p className="card-creator-name">Add a card</p>
          </div>
        </Button>
      </div>
    </div>
  );
};
