export enum TasksActionTypes {
  GET_REORDER_TASKS = "GET_REORDER_TASKS",
  SET_TASK_DESCRIPTION = "SET_TASK_DESCRIPTION",
  CHANGE_TASK_PRIORITY_HIGH = "CHANGE_TASK_PRIORITY_HIGH",
  CHANGE_TASK_PRIORITY_LOW = "CHANGE_TASK_PRIORITY_LOW",
  SORT_BY_PRIORITY = "SORT_BY_PRIORITY",
  REMOVE_TASKS_BY_PRIORITY = "REMOVE_TASKS_BY_PRIORITY",
  SET_ENDTIME_TASKS = "SET_ENDTIME_TASKS",
  REMOVE_ENDTIME_TASKS = "REMOVE_ENDTIME_TASKS",
  SET_DESCRIPTION_TASKS = "SET_DESCRIPTION_TASKS",
  CHANGE_TITLE = "CHANGE_TITLE",
  CHANGE_TASK_STATUS = "CHANGE_TASK_STATUS",
  ADD_TASKS = "ADD_TASKS",
  REMOVE_TASK = "REMOVE_TASK",
  CLOSE_TASK = "CLOSE_TASK",
}

interface IChangeTaskStatus {
  type: TasksActionTypes.CHANGE_TASK_STATUS;
  payload: string;
}

interface IAddNewTask {
  type: TasksActionTypes.ADD_TASKS;
  payload: any;
}
