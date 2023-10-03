import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clsx } from 'clsx';

import { useHover } from '../../hooks/useHover';
import { deleteList, updateList } from '../../store/slices/listSlice';
import { selectTasksFromList } from '../../store/slices/taskSlice';
import { ActionButtons } from '../ActionButtons/ActionButtons';
import { EditableListItem } from '../EditableListItem/EditableListItem';
import { TaskCreator } from '../TaskCreator/TaskCreator';
import { TaskItem } from '../TaskItem/TaskItem';

import './ListItem.scss';

type ListItemProps = {
  id: number;
  name: string;
};

export const ListItem = ({ id, name }: ListItemProps) => {
  const dispatch = useDispatch();
  const tasks = useSelector((state) => selectTasksFromList(state, id));
  const [isHovering, handleMouseOver, handleMouseOut] = useHover();

  const [editMode, setEditMode] = useState(false);

  return (
    <div>
      <div className="list">
        {editMode ? (
          <EditableListItem
            name={name}
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

        {tasks.length ? tasks.map((task) => <TaskItem key={task.id} id={task.id} name={task.name} />) : null}
        <TaskCreator />
      </div>
    </div>
  );
};
