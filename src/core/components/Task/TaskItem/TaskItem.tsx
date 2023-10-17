import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
  selectSubtasksInfo,
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
  item: TaskType | SubtaskType;
};

export const TaskItem = ({ item }: TaskItemProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const { subtasksCount, checkedSubtasksCount } = useSelector((state) => selectSubtasksInfo(state, item.id));
  const [isHovering, handleMouseOver, handleMouseOut] = useHover();

  const [editMode, setEditMode] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);

  const taskItem = isTask(item);

  const updateTaskHandler = taskItem
    ? (taskName: string) =>
        dispatch(
          updateTask({
            id: item.id,
            newName: taskName,
          })
        )
    : (subtaskName: string) =>
        dispatch(
          updateSubtask({
            taskId: item.taskId,
            subtaskId: item.id,
            newName: subtaskName,
          })
        );

  const checkTaskHandler = taskItem
    ? () => dispatch(checkTask({ id: item.id, checked: !item.checked, listId: item.listId }))
    : () => dispatch(checkSubtask({ subtaskId: item.id, taskId: item.taskId, checked: !item.checked }));

  const deleteTaskHandler = taskItem
    ? () => dispatch(deleteTask({ id: item.id, listId: item.listId }))
    : () => dispatch(deleteSubtask({ subtaskId: item.id, taskId: item.taskId }));

  return editMode ? (
    <EditableTaskItem name={item.name} confirmHandler={updateTaskHandler} callback={() => setEditMode(false)} />
  ) : (
    <>
      <div
        className={clsx('task-item', { hovered: isHovering && !editMode })}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
      >
        <div className="name-section">
          {!editMode && taskItem && (isHovering || item.subtasks.length) ? (
            <Button
              className={clsx('dropdown', { isOpen: openDropdown })}
              onClick={() => setOpenDropdown((prev) => !prev)}
            >
              <ArrowLeft />
            </Button>
          ) : null}
          <Checkbox checked={item.checked} onChange={checkTaskHandler} />
          <p>{item.name}</p>
        </div>

        {isHovering && !editMode ? (
          <ActionButtons onEditClick={() => setEditMode(true)} onDeleteClick={deleteTaskHandler} />
        ) : null}
        {!isHovering && !editMode && subtasksCount !== 0 ? (
          <p className="subtasks-counter">{`${checkedSubtasksCount}/${subtasksCount}`}</p>
        ) : null}
      </div>

      {openDropdown && taskItem ? (
        <>
          <div className="subtasks-container">
            {item.subtasks.length ? item.subtasks.map((subtask) => <TaskItem key={subtask.id} item={subtask} />) : null}
          </div>
          <TaskCreator
            placeholder="Add a subtask"
            taskConfirmHandler={(subtaskName) => {
              dispatch(
                addSubtask({
                  id: nanoid(),
                  taskId: item.id,
                  boardId: item.boardId,
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
