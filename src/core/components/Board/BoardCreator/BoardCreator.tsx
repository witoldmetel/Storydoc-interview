import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { clsx } from 'clsx';

import { Plus, Tick } from '../../../../assets/icons';
import { createBoard } from '../../../store/slices/boardSlice';
import { Button } from '../../Button/Button';
import { EditableBoardItem } from '../EditableBoardItem/EditableBoardItem';

import './BoardCreator.scss';

type BoardCreatorProps = {
  createMode: boolean;

  callback: (boardId?: number) => void;
};

export const BoardCreator = ({ createMode, callback }: BoardCreatorProps) => {
  const dispatch = useDispatch();

  const [boardName, setBoardName] = useState('');

  const isButtonDisabled = createMode ? boardName.trim() === '' : false;

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBoardName(event.target.value);
  };

  const handleBoardCreate = () => {
    if (createMode) {
      dispatch(createBoard({ name: boardName }));
      setBoardName('');
    }

    callback();
  };

  const handleInputKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.code === 'Enter') {
      handleBoardCreate();
    }
  };

  return (
    <>
      {createMode ? (
        <EditableBoardItem
          boardName={boardName}
          handleInputChange={handleInputChange}
          onKeyDown={handleInputKeyPress}
        />
      ) : null}
      <Button
        onClick={handleBoardCreate}
        disabled={isButtonDisabled}
        className={clsx({ 'create-mode': createMode }, { disabled: isButtonDisabled }, { enabled: !isButtonDisabled })}
      >
        <div className="board-content">
          {createMode ? <Tick color={isButtonDisabled ? '#594F78' : '#FFF'} /> : <Plus />}
          <p className="board-content-name">{createMode ? 'Save new workspace' : 'Create workspace'}</p>
        </div>
      </Button>
    </>
  );
};
