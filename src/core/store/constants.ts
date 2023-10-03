import Images from '../../assets/images';

export const initialWorkspaceState = [
  {
    id: 0,
    name: 'Acme Corp workspace',
    initials: 'A',
    logo: Images.PredefinedLogo,
    isActive: true,
    listIds: [0, 1],
  },
];

export const initialListState = [
  { id: 0, name: 'Working on', boardId: 0, tasksIds: [0, 1] },
  { id: 1, name: 'Review', boardId: 0, tasksIds: [2, 3, 4] },
];

export const initialTaskState = [
  {
    id: 0,
    name: 'Task 1',
    listId: 0,
    subtasks: [],
  },
  {
    id: 1,
    name: 'Task 2',
    listId: 0,
    subtasks: [],
  },
  {
    id: 2,
    name: 'Task 3',
    listId: 1,
    subtasks: [],
  },
  {
    id: 3,
    name: 'Task 4',
    listId: 1,
    subtasks: [],
  },
  {
    id: 4,
    name: 'Task 5',
    listId: 1,
    subtasks: [],
  },
];
