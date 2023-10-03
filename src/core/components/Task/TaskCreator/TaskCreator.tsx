import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { Plus } from '../../../../assets/icons';
import { addTask } from '../../../store/slices/taskSlice';
import { Button } from '../../Button/Button';
import { EditableTaskItem } from '../EditableTaskItem/EditableTaskItem';

import './TaskCreator.scss';

type TaskCreator = {
  listId: number;
};

export const TaskCreator = ({ listId }: TaskCreator) => {
  const dispatch = useDispatch();

  const [createMode, setCreateMode] = useState(false);

  return (
    <>
      {createMode ? (
        <EditableTaskItem
          confirmHandler={(taskName) =>
            dispatch(
              addTask({
                listId,
                name: taskName,
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
