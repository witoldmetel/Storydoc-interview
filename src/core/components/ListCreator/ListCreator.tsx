import { Plus } from '../../../assets/icons';
import { Button } from '../Button/Button';

import './ListCreator.scss';

export const ListCreator = () => {
  return (
    <Button onClick={() => console.log('wow')} className="button-list-creator">
      <div className="list-creator-content">
        <Plus color="#88819f" />
        <p className="list-creator-name">Add another list</p>
      </div>
    </Button>
  );
};
