import { forwardRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clsx } from 'clsx';

import { useHover } from '../../../hooks/useHover';
import { deleteList, selectListTasksInfo, updateList } from '../../../store/slices/listSlice';
import { AppDispatch } from '../../../store/store';
import { ListType } from '../../../store/types';
import { ActionButtons } from '../../ActionButtons/ActionButtons';
import { TasksContainer } from '../../Task';
import { EditableListItem } from '../EditableListItem/EditableListItem';

import './ListItem.scss';

type ListItemProps = {
  list: ListType;
  isDragging?: boolean;
};

export const ListItem = forwardRef<HTMLInputElement, ListItemProps>(({ list, isDragging }, ref) => {
  const dispatch = useDispatch<AppDispatch>();
  const { tasksCount, checkedTasksCount } = useSelector((state) => selectListTasksInfo(state, list.id));
  const [isHovering, handleMouseOver, handleMouseOut] = useHover();

  const [editMode, setEditMode] = useState(false);

  const hovered = isHovering && !editMode && !isDragging;

  return (
    <div>
      <div className="list">
        {editMode ? (
          <EditableListItem
            name={list.name}
            confirmHandler={(listName) =>
              dispatch(
                updateList({
                  id: list.id,
                  newName: listName,
                })
              )
            }
            callback={() => setEditMode(false)}
          />
        ) : (
          <div
            className={clsx('list-name', { hovered })}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
            ref={ref}
          >
            <h1>{list.name}</h1>
            {hovered ? (
              <ActionButtons
                onEditClick={() => setEditMode(true)}
                onDeleteClick={() => dispatch(deleteList(list.id))}
              />
            ) : null}
            {!isHovering && !editMode && tasksCount !== 0 ? (
              <h1 className="tasks-counter">{`${checkedTasksCount}/${tasksCount}`}</h1>
            ) : null}
          </div>
        )}

        <TasksContainer listId={list.id} />
      </div>
    </div>
  );
});
