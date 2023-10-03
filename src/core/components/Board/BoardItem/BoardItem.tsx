import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { clsx } from 'clsx';

import { useHover } from '../../../hooks/useHover';
import { deleteBoard, setActiveBoard, updateBoard } from '../../../store/slices/boardSlice';
import { BoardType } from '../../../store/types';
import { ActionButtons } from '../../ActionButtons/ActionButtons';
import { EditableBoardItem } from '../EditableBoardItem/EditableBoardItem';

import './BoardItem.scss';

type BoardItemProps = {
  board: BoardType;
};

export const BoardItem = ({ board }: BoardItemProps) => {
  const dispatch = useDispatch();
  const [isHovering, handleMouseOver, handleMouseOut] = useHover();

  const [editMode, setEditMode] = useState(false);
  const [boardName, setBoardName] = useState(board.name ?? '');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setBoardName(event.target.value);
  };

  const onDeleteClick = () => {
    dispatch(deleteBoard(board.id));
  };

  const onConfirmUpdate = () => {
    if (boardName) {
      dispatch(updateBoard({ id: board.id, newName: boardName }));
    }

    setEditMode(false);
  };

  const handleInputKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.code === 'Enter') {
      onConfirmUpdate();
    }
  };

  return editMode ? (
    <EditableBoardItem
      boardName={boardName}
      boardLogo={board.logo}
      handleInputChange={handleInputChange}
      onBlur={onConfirmUpdate}
      onKeyDown={handleInputKeyPress}
    />
  ) : (
    <div
      className={clsx(
        'board-item',
        { hovered: isHovering && !editMode },
        { 'inactive-board': editMode },
        { 'active-board': board.isActive }
      )}
      onClick={() => dispatch(setActiveBoard(board.id))}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      <div className="board-item-content">
        {board.logo ? <img src={board.logo} alt={board.name} /> : <span className="initials">{board.initials}</span>}
        <span className={clsx({ hovered: isHovering && !editMode })}>{board.name}</span>
      </div>

      {isHovering && !editMode ? (
        <ActionButtons onEditClick={() => setEditMode(true)} onDeleteClick={onDeleteClick} />
      ) : null}
    </div>
  );
};
