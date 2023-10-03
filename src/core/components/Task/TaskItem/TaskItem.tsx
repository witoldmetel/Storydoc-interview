import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { clsx } from 'clsx';

import { useHover } from '../../../hooks/useHover';
import { deleteTask, updateTask } from '../../../store/slices/taskSlice';
import { ActionButtons } from '../../ActionButtons/ActionButtons';
import { EditableTaskItem } from '../EditableTaskItem/EditableTaskItem';

import './TaskItem.scss';

type TaskItemProps = {
  id: number;
  name: string;
};

export const TaskItem = ({ id, name }: TaskItemProps) => {
  const dispatch = useDispatch();
  const [isHovering, handleMouseOver, handleMouseOut] = useHover();

  const [editMode, setEditMode] = useState(false);

  return editMode ? (
    <EditableTaskItem
      taskId={id}
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
    <div
      className={clsx('task-item', { hovered: isHovering && !editMode })}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      <p>{name}</p>
      {isHovering && !editMode ? (
        <ActionButtons onEditClick={() => setEditMode(true)} onDeleteClick={() => dispatch(deleteTask(id))} />
      ) : null}
    </div>
  );
};
