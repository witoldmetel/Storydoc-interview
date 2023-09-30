import { Pencil, TrashBin } from '../../../assets/icons';
import { Button } from '../Button/Button';

import './ActionButtons.scss';

type ActionButtonsProps = {
  onEditClick: VoidFunction;
  onDeleteClick: VoidFunction;
};

export const ActionButtons = ({ onEditClick, onDeleteClick }: ActionButtonsProps) => {
  return (
    <div className="action-buttons">
      <Button
        onClick={(e) => {
          e.stopPropagation();

          onEditClick();
        }}
        className="button"
      >
        <Pencil />
      </Button>
      <Button
        onClick={(e) => {
          e.stopPropagation();

          onDeleteClick();
        }}
        className="button"
      >
        <TrashBin />
      </Button>
    </div>
  );
};
