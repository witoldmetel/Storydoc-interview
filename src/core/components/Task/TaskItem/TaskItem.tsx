import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { nanoid } from '@reduxjs/toolkit';
import { clsx } from 'clsx';

import { ArrowLeft } from '../../../../assets/icons';
import { useHover } from '../../../hooks/useHover';
import {
  addSubtask,
  checkSubtask,
  checkTask,
  deleteSubtask,
  deleteTask,
  updateSubtask,
  updateTask,
} from '../../../store/slices/taskSlice';
import { AppDispatch } from '../../../store/store';
import { SubtaskType, TaskType } from '../../../store/types';
import { ActionButtons } from '../../ActionButtons/ActionButtons';
import { Button } from '../../Button/Button';
import { Checkbox } from '../../Checkbox/Checkbox';
import { isTask } from '../../utils';
import { EditableTaskItem } from '../EditableTaskItem/EditableTaskItem';
import { TaskCreator } from '../TaskCreator/TaskCreator';

import './TaskItem.scss';

type TaskItemProps = {
  task: TaskType | SubtaskType;
};

export const TaskItem = ({ task }: TaskItemProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const [isHovering, handleMouseOver, handleMouseOut] = useHover();

  const [editMode, setEditMode] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);

  const taskItem = isTask(task);

  const updateTaskHandler = taskItem
    ? (taskName: string) =>
        dispatch(
          updateTask({
            id: task.id,
            newName: taskName,
          })
        )
    : (subtaskName: string) =>
        dispatch(
          updateSubtask({
            taskId: task.taskId,
            subtaskId: task.id,
            newName: subtaskName,
          })
        );

  const checkTaskHandler = taskItem
    ? () => dispatch(checkTask({ id: task.id, checked: !task.checked, listId: task.listId }))
    : () => dispatch(checkSubtask({ subtaskId: task.id, taskId: task.taskId, checked: !task.checked }));

  const deleteTaskHandler = taskItem
    ? () => dispatch(deleteTask({ id: task.id, listId: task.listId }))
    : () => dispatch(deleteSubtask({ subtaskId: task.id, taskId: task.taskId }));

  return editMode ? (
    <EditableTaskItem name={task.name} confirmHandler={updateTaskHandler} callback={() => setEditMode(false)} />
  ) : (
    <>
      <div
        className={clsx('task-item', { hovered: isHovering && !editMode })}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      >
        <div className="name-section">
          {isHovering && !editMode && taskItem ? (
            <Button
              className={clsx('dropdown', { isOpen: openDropdown })}
              onClick={() => setOpenDropdown((prev) => !prev)}
            >
              <ArrowLeft />
            </Button>
          ) : null}
          <Checkbox checked={task.checked} onChange={checkTaskHandler} />
          <p>{task.name}</p>
        </div>

        {isHovering && !editMode ? (
          <ActionButtons onEditClick={() => setEditMode(true)} onDeleteClick={deleteTaskHandler} />
        ) : null}
      </div>

      {openDropdown && taskItem ? (
        <>
          <div className="subtasks-container">
            {task.subtasks.length ? task.subtasks.map((subtask) => <TaskItem key={subtask.id} task={subtask} />) : null}
          </div>
          <TaskCreator
            placeholder="Add a subtask"
            taskConfirmHandler={(subtaskName) => {
              dispatch(
                addSubtask({
                  id: nanoid(),
                  taskId: task.id,
                  boardId: task.boardId,
                  name: subtaskName,
                })
              );
            }}
          />
        </>
      ) : null}
    </>
  );
};
