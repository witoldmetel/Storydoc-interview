import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Plus } from '../../../assets/icons';
import { selectActiveBoardId } from '../../store/slices/boardSlice';
import { addList } from '../../store/slices/listSlice';
import { Button } from '../Button/Button';

import './ListCreator.scss';

export const ListCreator = () => {
  const dispatch = useDispatch();
  const activeBoardId = useSelector(selectActiveBoardId);

  const [createMode, setCreateMode] = useState(false);
  const [listName, setListName] = useState('');

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setListName(event.target.value);
  };

  const createNewList = () => {
    if (listName) {
      dispatch(
        addList({
          boardId: activeBoardId,
          name: listName,
        })
      );
      setListName('');
    }

    setCreateMode(false);
  };

  const handleInputKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.code === 'Enter') {
      createNewList();
    }
  };

  return createMode ? (
    <input
      type="text"
      className="list-input"
      placeholder="Title of the new list..."
      maxLength={28}
      value={listName}
      onChange={handleInputChange}
      onBlur={createNewList}
      onKeyDown={handleInputKeyPress}
      autoFocus
    />
  ) : (
    <Button onClick={() => setCreateMode(true)} className="button-list-creator">
      <div className="list-creator-content">
        <Plus color="#88819f" />
        <p className="list-creator-name">Add another list</p>
      </div>
    </Button>
  );
};
