export interface IBoards {
  title: string;
  date: string | object;
  key: string;
  status: string | boolean;
}

export interface ITask {
  id: string;
  title: string;
  endTime: string | null;
  description: string;
  priority: string;
  status: string;
  number: number;
  subtasks: any[];
  comments: any[];
  subComments: any[];
}
