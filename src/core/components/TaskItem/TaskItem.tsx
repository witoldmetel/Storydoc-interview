import { useState } from 'react';
import { clsx } from 'clsx';

import { useHover } from '../../hooks/useHover';
import { ActionButtons } from '../ActionButtons/ActionButtons';

import './TaskItem.scss';

type TaskItemProps = {
  id: number;
  name: string;
};

export const TaskItem = ({ id, name }: TaskItemProps) => {
  const [isHovering, handleMouseOver, handleMouseOut] = useHover();

  const [editMode, setEditMode] = useState(false);

  return (
    <div
      className={clsx('task-item', { hovered: isHovering && !editMode })}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      <p>{name}</p>
      {isHovering && !editMode ? (
        <ActionButtons onEditClick={() => setEditMode(true)} onDeleteClick={() => console.log(id)} />
      ) : null}
    </div>
  );
};
