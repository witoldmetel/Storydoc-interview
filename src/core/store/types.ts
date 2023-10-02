export type WorkspaceType = {
  id: number;
  name: string;
  initials: string;
  isActive: boolean;
  listIds: ListType['id'][];

  logo?: string;
};

export type ListType = {
  id: number;
  name: string;
  boardId: WorkspaceType['id'];
  cards: CardType[];
};

export type CardType = {
  id: number;
  name: string;
};
