import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { nanoid } from '@reduxjs/toolkit';
import { clsx } from 'clsx';

import { useHover } from '../../../hooks/useHover';
import { selectActiveBoardId } from '../../../store/slices/boardSlice';
import { deleteList, selectListTasksInfo, updateList } from '../../../store/slices/listSlice';
import { addTask, selectTasksFromList } from '../../../store/slices/taskSlice';
import { AppDispatch } from '../../../store/store';
import { ActionButtons } from '../../ActionButtons/ActionButtons';
import { TaskCreator, TaskItem } from '../../Task';
import { EditableListItem } from '../EditableListItem/EditableListItem';

import './ListItem.scss';

type ListItemProps = {
  id: string;
  name: string;
};

export const ListItem = ({ id, name }: ListItemProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const activeBoardId = useSelector(selectActiveBoardId);
  const tasks = useSelector((state) => selectTasksFromList(state, id));
  const { tasksCount, checkedTasksCount } = useSelector((state) => selectListTasksInfo(state, id));
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
            {!isHovering && !editMode && tasksCount !== 0 ? (
              <h1 className="tasks-counter">{`${checkedTasksCount}/${tasksCount}`}</h1>
            ) : null}
          </div>
        )}

        {tasks.length ? tasks.map((task) => <TaskItem key={task.id} item={task} />) : null}
        <TaskCreator
          placeholder="Add a card"
          taskConfirmHandler={(taskName) => {
            dispatch(
              addTask({
                id: nanoid(),
                listId: id,
                boardId: activeBoardId!,
                name: taskName,
              })
            );
          }}
        />
      </div>
    </div>
  );
};
