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
    listId: '10',
    subtasks: [],
  },
  {
    id: '11',
    name: 'Task 2',
    listId: '10',
    subtasks: [],
  },
  {
    id: '12',
    name: 'Task 3',
    listId: '11',
    subtasks: [],
  },
  {
    id: '13',
    name: 'Task 4',
    listId: '11',
    subtasks: [],
  },
  {
    id: '14',
    name: 'Task 5',
    listId: '11',
    subtasks: [],
  },
];
