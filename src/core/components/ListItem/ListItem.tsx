import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clsx } from 'clsx';

import { Plus } from '../../../assets/icons';
import { useHover } from '../../hooks/useHover';
import { deleteList, updateList } from '../../store/slices/listSlice';
import { selectTasksFromList } from '../../store/slices/taskSlice';
import { ActionButtons } from '../ActionButtons/ActionButtons';
import { Button } from '../Button/Button';
import { EditableListItem } from '../EditableListItem/EditableListItem';

import './ListItem.scss';

type ListProps = {
  id: number;
  name: string;
};

export const ListItem = ({ id, name }: ListProps) => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => selectTasksFromList(state, id));
  const [isHovering, handleMouseOver, handleMouseOut] = useHover();

  const [editMode, setEditMode] = useState(false);

  return (
    <div>
      <div className="list">
        {editMode ? (
          <EditableListItem
            confirmHandler={(listName) =>
              dispatch(
                updateList({
                  id,
                  newName: listName,
                })
              )
            }
            callback={() => setEditMode(false)}
          />
        ) : (
          <div
            className={clsx('list-name', { hovered: isHovering && !editMode })}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
          >
            <h1>{name}</h1>
            {isHovering && !editMode ? (
              <ActionButtons onEditClick={() => setEditMode(true)} onDeleteClick={() => dispatch(deleteList(id))} />
            ) : null}
          </div>
        )}

        {tasks.length
          ? tasks.map((task) => (
              <div key={task.id} className="list__task">
                <p>{task.name}</p>
              </div>
            ))
          : null}
        <Button onClick={() => console.log('add new card')} className="button-card-creator">
          <div className="card-creator-content">
            <Plus color="#88819f" />
            <p className="card-creator-name">Add a card</p>
          </div>
        </Button>
      </div>
    </div>
  );
};
