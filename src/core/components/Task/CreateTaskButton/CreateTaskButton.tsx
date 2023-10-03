import { Plus } from '../../../../assets/icons';
import { Button } from '../../Button/Button';

import './CreateTaskButton.scss';

type CreateTaskButtonProps = {
  placeholder: string;
  onClick: VoidFunction;
};

export const CreateTaskButton = ({ placeholder, onClick }: CreateTaskButtonProps) => {
  return (
    <Button onClick={onClick} className="button-card-creator">
      <div className="card-creator-content">
        <Plus color="#88819f" />
        <p className="card-creator-name">{placeholder}</p>
      </div>
    </Button>
  );
};
