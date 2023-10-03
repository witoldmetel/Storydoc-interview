import { getBoardInitials } from '../../utils';

import './EditableBoardItem.scss';

type EditableBoardItemProps = {
  boardName: string;
  boardLogo?: string;

  handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: VoidFunction;
  onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
};

export const EditableBoardItem = ({
  boardName,
  boardLogo,
  handleInputChange,
  onBlur,
  onKeyDown,
}: EditableBoardItemProps) => {
  return (
    <div className="board-input">
      {boardLogo ? (
        <img src={boardLogo} alt={boardName} />
      ) : (
        <span className="logo">{getBoardInitials(boardName)}</span>
      )}
      <input
        type="text"
        className="input-name"
        placeholder={boardName ? boardName : 'Workspace name'}
        maxLength={28}
        value={boardName}
        onChange={handleInputChange}
        onBlur={onBlur}
        onKeyDown={onKeyDown}
        autoFocus
      />
    </div>
  );
};
