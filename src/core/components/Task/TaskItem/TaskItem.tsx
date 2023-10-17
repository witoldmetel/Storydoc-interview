import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { nanoid } from '@reduxjs/toolkit';
import { clsx } from 'clsx';

import { ArrowLeft } from '../../../../assets/icons';
import { useHover } from '../../../hooks/useHover';
import { addSubtask, checkTask, deleteTask, updateTask } from '../../../store/slices/taskSlice';
import { AppDispatch } from '../../../store/store';
import { ActionButtons } from '../../ActionButtons/ActionButtons';
import { Button } from '../../Button/Button';
import { Checkbox } from '../../Checkbox/Checkbox';
import { EditableTaskItem } from '../EditableTaskItem/EditableTaskItem';
import { TaskCreator } from '../TaskCreator/TaskCreator';

import './TaskItem.scss';

type TaskItemProps = {
  id: string;
  name: string;
  checked: boolean;
  listId: string;
  boardId: string;
};

export const TaskItem = ({ id, name, checked, listId, boardId }: TaskItemProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const [isHovering, handleMouseOver, handleMouseOut] = useHover();

  const [editMode, setEditMode] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);

  return editMode ? (
    <EditableTaskItem
      name={name}
      confirmHandler={(taskName) =>
        dispatch(
          updateTask({
            id,
            newName: taskName,
          })
        )
      }
      callback={() => setEditMode(false)}
    />
  ) : (
    <>
      <div
        className={clsx('task-item', { hovered: isHovering && !editMode })}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      >
        <div className="name-section">
          {isHovering && !editMode ? (
            <Button
              className={clsx('dropdown', { isOpen: openDropdown })}
              onClick={() => setOpenDropdown((prev) => !prev)}
            >
              <ArrowLeft />
            </Button>
          ) : null}
          <Checkbox checked={checked} onChange={() => dispatch(checkTask({ id, checked: !checked, listId }))} />
          <p>{name}</p>
        </div>

        {isHovering && !editMode ? (
          <ActionButtons
            onEditClick={() => setEditMode(true)}
            onDeleteClick={() => dispatch(deleteTask({ id, listId }))}
          />
        ) : null}
      </div>
      {openDropdown ? (
        <TaskCreator
          placeholder="Add a subtask"
          taskConfirmHandler={(subtaskName) => {
            dispatch(
              addSubtask({
                id: nanoid(),
                taskId: id,
                boardId,
                name: subtaskName,
              })
            );
          }}
        />
      ) : null}
    </>
  );
};
