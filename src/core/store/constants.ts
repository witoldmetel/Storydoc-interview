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
      listIds: ['10', '11'],
    },
  ],
};

export const initialListState = [
  { id: '10', name: 'Working on', boardId: '10', tasksIds: ['10', '11'] },
  { id: '11', name: 'Review', boardId: '10', tasksIds: ['12', '13', '14'] },
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
