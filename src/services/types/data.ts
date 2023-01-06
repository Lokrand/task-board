export interface IBoards {
  title: string;
  date: string;
  key: string;
  status: string;
}

export interface ITask {
  id: string,
  endTime: string | null,
  description: string,
  priority: string,
  status: string,
  number: number,
  subtasks: any[],
  comments: any[],
  subComments: any[],
}
