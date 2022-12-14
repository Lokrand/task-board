export enum TasksActionTypes {
  GET_REORDER_TASKS = "GET_REORDER_TASKS",
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
  payload: any;
}

interface IAddNewTask {
  type: TasksActionTypes.ADD_TASKS;
  payload: any;
}

interface ICloseTaskAction {
  type: TasksActionTypes.CLOSE_TASK;
  payload: any;
}

interface IGetReorderTasks {
  type: TasksActionTypes.GET_REORDER_TASKS;
  payload: any;
}

interface IChangeTaskPriorityHigh {
  type: TasksActionTypes.CHANGE_TASK_PRIORITY_HIGH;
  payload: any;
}
interface IChangeTaskPriorityLow {
  type: TasksActionTypes.CHANGE_TASK_PRIORITY_LOW;
  payload: any;
}

interface ISortByPriority {
  type: TasksActionTypes.SORT_BY_PRIORITY;
}

interface IRemoveTasksByPriority {
  type: TasksActionTypes.REMOVE_TASKS_BY_PRIORITY;
  payload: any;
}

interface IRemoveTask {
  type: TasksActionTypes.REMOVE_TASK;
  payload: any;
}

interface ISetEndTimeTasks {
  type: TasksActionTypes.SET_ENDTIME_TASKS;
  payload: any;
}

interface IRemoveEndTimeTasks {
  type: TasksActionTypes.REMOVE_ENDTIME_TASKS;
  payload: any;
}

interface ISetDescriptionTasks {
  type: TasksActionTypes.SET_DESCRIPTION_TASKS;
  payload: any;
}

interface IChangeTitleTasks {
  type: TasksActionTypes.CHANGE_TITLE;
  payload: any;
}

export type TTasksActions =
  | IAddNewTask
  | IChangeTaskPriorityHigh
  | IChangeTaskPriorityLow
  | IChangeTaskStatus
  | IChangeTitleTasks
  | ICloseTaskAction
  | IGetReorderTasks
  | IRemoveEndTimeTasks
  | IRemoveTask
  | IRemoveTasksByPriority
  | ISetDescriptionTasks
  | ISetEndTimeTasks
  | ISortByPriority;

export const changeTaskStatus = (payload: any): TTasksActions => ({
  type: TasksActionTypes.CHANGE_TASK_STATUS,
  payload,
});

export const addNewTask = (payload: any): TTasksActions => ({
  type: TasksActionTypes.ADD_TASKS,
  payload,
});

export const closeTaskAction = (payload: any): TTasksActions => ({
  type: TasksActionTypes.CLOSE_TASK,
  payload,
});

export const getReorderTasks = (payload: any): TTasksActions => ({
  type: TasksActionTypes.GET_REORDER_TASKS,
  payload,
});

export const changeTaskPriorityHigh = (payload: any): TTasksActions => ({
  type: TasksActionTypes.CHANGE_TASK_PRIORITY_HIGH,
  payload,
});

export const changeTaskPriorityLow = (payload: any): TTasksActions => ({
  type: TasksActionTypes.CHANGE_TASK_PRIORITY_LOW,
  payload,
});

export const sortByPriority = (): TTasksActions => ({
  type: TasksActionTypes.SORT_BY_PRIORITY,
});

export const removeTasksByPriority = (payload: any): TTasksActions => ({
  type: TasksActionTypes.REMOVE_TASKS_BY_PRIORITY,
  payload,
});

export const removeTask = (payload: any): TTasksActions => ({
  type: TasksActionTypes.REMOVE_TASK,
  payload,
});

export const setEndTimeTasks = (payload: any): TTasksActions => ({
  type: TasksActionTypes.SET_ENDTIME_TASKS,
  payload,
});

export const removeEndTimeTasks = (payload: any): TTasksActions => ({
  type: TasksActionTypes.REMOVE_ENDTIME_TASKS,
  payload,
});

export const setDescriptionTasks = (payload: any): TTasksActions => ({
  type: TasksActionTypes.SET_DESCRIPTION_TASKS,
  payload,
});

export const changeTitleTasks = (payload: any): TTasksActions => ({
  type: TasksActionTypes.CHANGE_TITLE,
  payload,
});
