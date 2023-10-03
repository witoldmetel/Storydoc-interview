import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Plus } from '../../../assets/icons';
import { selectActiveBoardId } from '../../store/slices/boardSlice';
import { addList } from '../../store/slices/listSlice';
import { Button } from '../Button/Button';
import { EditableTaskItem } from '../EditableTaskItem/EditableTaskItem';

import './TaskCreator.scss';

export const TaskCreator = () => {
  const dispatch = useDispatch();
  const activeBoardId = useSelector(selectActiveBoardId);

  const [createMode, setCreateMode] = useState(false);

  return (
    <>
      {createMode ? (
        <EditableTaskItem
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
      ) : null}
      <Button onClick={() => setCreateMode(true)} className="button-card-creator">
        <div className="card-creator-content">
          <Plus color="#88819f" />
          <p className="card-creator-name">Add a card</p>
        </div>
      </Button>
    </>
  );
};
