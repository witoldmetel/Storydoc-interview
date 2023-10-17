import Images from '../../assets/images';

export const initialBoardState = {
  activeBoardId: '10',
  boards: [
    {
      id: '10',
      name: 'Acme Corp workspace',
      initials: 'A',
      logo: Images.PredefinedLogo,
      isActive: true,
    },
  ],
};

export const initialListState = [
  {
    id: '10',
    name: 'Working on',
    boardId: '10',
    tasksIncluded: [
      { id: '10', checked: false },
      { id: '11', checked: true },
    ],
  },
  {
    id: '11',
    name: 'Review',
    boardId: '10',
    tasksIncluded: [
      { id: '12', checked: true },
      { id: '13', checked: false },
      { id: '14', checked: true },
    ],
  },
];

export const initialTaskState = [
  {
    id: '10',
    name: 'Task 1',
    checked: false,
    boardId: '10',
    listId: '10',
    subtasks: [],
  },
  {
    id: '11',
    name: 'Task 2',
    checked: true,
    boardId: '10',
    listId: '10',
    subtasks: [],
  },
  {
    id: '12',
    name: 'Task 3',
    checked: true,
    boardId: '10',
    listId: '11',
    subtasks: [],
  },
  {
    id: '13',
    name: 'Task 4',
    checked: false,
    boardId: '10',
    listId: '11',
    subtasks: [],
  },
  {
    id: '14',
    name: 'Task 5',
    checked: true,
    boardId: '10',
    listId: '11',
    subtasks: [],
  },
];
