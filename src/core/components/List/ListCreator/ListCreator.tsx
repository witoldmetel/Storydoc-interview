import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Plus } from '../../../../assets/icons';
import { selectActiveBoardId } from '../../../store/slices/boardSlice';
import { addList } from '../../../store/slices/listSlice';
import { Button } from '../../Button/Button';
import { EditableListItem } from '../EditableListItem/EditableListItem';

import './ListCreator.scss';

export const ListCreator = () => {
  const dispatch = useDispatch();
  const activeBoardId = useSelector(selectActiveBoardId);

  const [createMode, setCreateMode] = useState(false);

  return createMode ? (
    <EditableListItem
      confirmHandler={(listName) =>
        dispatch(
          addList({
            boardId: activeBoardId,
            name: listName,
          })
        )
      }
      callback={() => setCreateMode(false)}
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
