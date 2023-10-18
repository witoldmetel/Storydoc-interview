import Images from '../../assets/images';

export const initialBoardState = {
  activeBoardId: 'activeBoardId_10',
  boards: [
    {
      id: 'activeBoardId_10',
      name: 'Acme Corp workspace',
      initials: 'A',
      logo: Images.PredefinedLogo,
      isActive: true,
    },
  ],
};

export const initialListState = [
  {
    id: 'listId_10',
    name: 'Working on',
    boardId: 'activeBoardId_10',
    tasksIncluded: [
      { id: 'taskId_10', checked: false },
      { id: 'taskId_11', checked: true },
    ],
  },
  {
    id: 'listId_11',
    name: 'Review',
    boardId: 'activeBoardId_10',
    tasksIncluded: [
      { id: 'taskId_12', checked: true },
      { id: 'taskId_13', checked: false },
      { id: 'taskId_14', checked: true },
    ],
  },
  {
    id: 'listId_12',
    name: 'New List',
    boardId: 'activeBoardId_10',
    tasksIncluded: [{ id: 'taskId_15', checked: true }],
  },
];

export const initialTaskState = [
  {
    id: 'taskId_10',
    name: 'Shopping list',
    checked: false,
    boardId: 'activeBoardId_10',
    listId: 'listId_10',
    subtasks: [
      {
        id: 'subtaskId_1',
        taskId: 'taskId_10',
        name: 'Buy milk',
        checked: false,
        boardId: 'activeBoardId_10',
      },
      {
        id: 'subtaskId_2',
        taskId: 'taskId_10',
        name: 'Get eggs',
        checked: true,
        boardId: 'activeBoardId_10',
      },
      {
        id: 'subtaskId_3',
        taskId: 'taskId_10',
        name: 'Purchase bread',
        checked: false,
        boardId: 'activeBoardId_10',
      },
    ],
  },
  {
    id: 'taskId_11',
    name: 'Pay bills',
    checked: true,
    boardId: 'activeBoardId_10',
    listId: 'listId_10',
    subtasks: [],
  },
  {
    id: 'taskId_12',
    name: 'Prepare presentation',
    checked: true,
    boardId: 'activeBoardId_10',
    listId: 'listId_11',
    subtasks: [],
  },
  {
    id: 'taskId_13',
    name: 'Call mom',
    checked: false,
    boardId: 'activeBoardId_10',
    listId: 'listId_11',
    subtasks: [],
  },
  {
    id: 'taskId_14',
    name: 'Go for a run',
    checked: true,
    boardId: 'activeBoardId_10',
    listId: 'listId_11',
    subtasks: [],
  },
  {
    id: 'taskId_15',
    name: 'Pick up dry cleaning',
    checked: true,
    boardId: 'activeBoardId_10',
    listId: 'listId_12',
    subtasks: [],
  },
];
