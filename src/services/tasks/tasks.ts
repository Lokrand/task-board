import { generateKeys } from "../../utils/generateKeys";
import { TasksActionTypes, TTasksActions } from "./actions";
import { ITask } from "../types/data";

interface ITasksState {
  tasks: ITask[];
}

const initialState: ITasksState = {
  tasks: [],
};

const removeEl = (state: ITask[], id: string) => {
  let result = state.filter((elem) => elem.id !== id);
  state = result;
  return state;
};

export const tasks = (
  state = initialState,
  action: TTasksActions
): ITasksState => {
  switch (action.type) {
    case TasksActionTypes.ADD_TASKS:
      return {
        ...state,
        tasks: [
          ...state.tasks,
          {
            id: generateKeys(),
            endTime: null,
            description: "",
            priority: "low",
            status: "queue",
            number: 0,
            subtasks: [],
            comments: [],
            subComments: [],
            ...action.payload,
          },
        ],
      };

    case TasksActionTypes.GET_REORDER_TASKS:
      return { ...state };
    case TasksActionTypes.CHANGE_TASK_PRIORITY_HIGH:
      const task = state.tasks.filter((el) => el.id === action.payload)[0];
      task.priority = "high";
      return { ...state };
    case TasksActionTypes.CHANGE_TASK_PRIORITY_LOW:
      const task1 = state.tasks.filter((el) => el.id === action.payload)[0];
      task1.priority = "low";
      return { ...state };
    case TasksActionTypes.SORT_BY_PRIORITY:
      state.tasks.sort((el) => {
        if (el.priority === "low") {
          return 1;
        } else return -1;
      });
      return { ...state };
    case TasksActionTypes.REMOVE_TASKS_BY_PRIORITY:
      const result = removeEl(state.tasks, action.payload);
      return { ...state, tasks: [...result] };
    case TasksActionTypes.REMOVE_TASK:
      const resultt = removeEl(state.tasks, action.payload);
      return { ...state, tasks: [...resultt] };
    case TasksActionTypes.SET_ENDTIME_TASKS:
      const taskEnd = state.tasks.filter(
        (el) => el.id === action.payload.id
      )[0];
      taskEnd.endTime = action.payload.endTime;
      return { ...state };
    case TasksActionTypes.REMOVE_ENDTIME_TASKS:
      return {
        ...state,
        tasks: state.tasks.map((item) =>
          item.id === action.payload ? { ...item, endTime: null } : item
        ),
      };
    case TasksActionTypes.SET_DESCRIPTION_TASKS:
      const taskDesc = state.tasks.filter(
        (el) => el.id === action.payload.id
      )[0];
      taskDesc.description = action.payload.description;
      return { ...state };
    case TasksActionTypes.CHANGE_TITLE:
      const taskTitl = state.tasks.filter(
        (el) => el.id === action.payload.id
      )[0];
      taskTitl.title = action.payload.title;
      return { ...state };
    case TasksActionTypes.CHANGE_TASK_STATUS:
      // for title and description and ...
      return {
        ...state,
        tasks: state.tasks.map((item) =>
          item.id === action.payload.id
            ? { ...item, status: action.payload.status }
            : item
        ),
      };
    case TasksActionTypes.CLOSE_TASK:
      return {
        ...state,
        // tasks: state.tasks.map((item) =>
        //   item.id === action.payload.id
        //     ? { ...item, status: "done", endTime: new Date() }
        //     : item
        
        // ),
        
        
      };
    default:
      return state;
  }
};
