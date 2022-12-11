import { generateKeys } from "../../utils/generateKeys";

const GET_REORDER_TASKS = "GET_REORDER_TASKS";
const SET_TASK_DESCRIPTION = "SET_TASK_DESCRIPTION";
const CHANGE_TASK_PRIORITY_HIGH = "CHANGE_TASK_PRIORITY_HIGH";
const CHANGE_TASK_PRIORITY_LOW = "CHANGE_TASK_PRIORITY_LOW";
const SORT_BY_PRIORITY = "SORT_BY_PRIORITY";
const REMOVE_TASKS_BY_PRIORITY = "REMOVE_TASKS_BY_PRIORITY";
const SET_ENDTIME_TASKS = "SET_ENDTIME_TASKS";
const REMOVE_ENDTIME_TASKS = "REMOVE_ENDTIME_TASKS";
const SET_DESCRIPTION_TASKS = "SET_DESCRIPTION_TASKS";
const CHANGE_TITLE = "CHANGE_TITLE";
const CHANGE_TASK_STATUS = "CHANGE_TASK_STATUS";
const ADD_TASKS = "ADD_TASKS";
const REMOVE_TASK = "REMOVE_TASK";
const CLOSE_TASK = "CLOSE_TASK";

const initialState = {
  tasks: [],
};

const fnArr = (reorder, state) => {
  reorder.forEach((item) => {
    state = state.filter((item2) => {
      return item2.id !== item.id;
    });
  });
  let result = [...state, ...reorder];
  return result;
};

const removeEl = (state, id) => {
  let result = state.filter((elem) => elem.id !== id);
  state = result;
  return state;
};

export const tasks = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TASKS:
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

    case GET_REORDER_TASKS:
      return { ...state };
    case CHANGE_TASK_PRIORITY_HIGH:
      const task = state.tasks.filter((el) => el.id === action.payload)[0];
      task.priority = "high";
      return { ...state };
    case CHANGE_TASK_PRIORITY_LOW:
      const task1 = state.tasks.filter((el) => el.id === action.payload)[0];
      task1.priority = "low";
      return { ...state };
    case SORT_BY_PRIORITY:
      state.tasks.sort((el) => {
        if (el.priority === "low") {
          return 1;
        } else return -1;
      });
      return { ...state };
    case REMOVE_TASKS_BY_PRIORITY:
      const result = removeEl(state.tasks, action.payload);
      return { ...state, tasks: [...result] };
    case REMOVE_TASK:
      const resultt = removeEl(state.tasks, action.payload);
      return { ...state, tasks: [...resultt] };
    case SET_ENDTIME_TASKS:
      const taskEnd = state.tasks.filter(
        (el) => el.id === action.payload.id
      )[0];
      taskEnd.endTime = action.payload.endTime;
      return { ...state };
    case REMOVE_ENDTIME_TASKS:
      return {
        ...state,
        tasks: state.tasks.map((item) =>
          item.id === action.payload ? { ...item, endTime: null } : item
        ),
      };
    case SET_DESCRIPTION_TASKS:
      const taskDesc = state.tasks.filter(
        (el) => el.id === action.payload.id
      )[0];
      taskDesc.description = action.payload.description;
      return { ...state };
    case CHANGE_TITLE:
      const taskTitl = state.tasks.filter(
        (el) => el.id === action.payload.id
      )[0];
      taskTitl.title = action.payload.title;
      return { ...state };
    case CHANGE_TASK_STATUS: // for title and description and ...
      return {
        ...state,
        tasks: state.tasks.map((item) =>
          item.id === action.payload.id
            ? { ...item, status: action.payload.status }
            : item
        ),
      };
    case CLOSE_TASK:
      return {
        ...state,
        tasks: state.tasks.map((item) =>
          item.id === action.payload.id
            ? { ...item, status: "done", endTime: new Date() }
            : item
        ),
      };
    default:
      return state;
  }
};

export const changeTaskStatus = (payload) => ({
  type: CHANGE_TASK_STATUS,
  payload,
});

export const addNewTask = (payload) => ({
  type: ADD_TASKS,
  payload,
});
export const closeTaskAction = (payload) => ({
  type: CLOSE_TASK,
  payload,
});

export const getReorderTasks = (payload) => ({
  type: GET_REORDER_TASKS,
  payload,
});
export const setTaskDescription = (payload) => ({
  type: SET_TASK_DESCRIPTION,
  payload,
});
export const changeTaskPriorityHigh = (payload) => ({
  type: CHANGE_TASK_PRIORITY_HIGH,
  payload,
});
export const changeTaskPriorityLow = (payload) => ({
  type: CHANGE_TASK_PRIORITY_LOW,
  payload,
});
export const sortByPriority = () => ({
  type: SORT_BY_PRIORITY,
});
export const removeTasksByPriority = (payload) => ({
  type: REMOVE_TASKS_BY_PRIORITY,
  payload,
});
export const removeTask = (payload) => ({
  type: REMOVE_TASK,
  payload,
});
export const setEndTimeTasks = (payload) => ({
  type: SET_ENDTIME_TASKS,
  payload,
});
export const removeEndTimeTasks = (payload) => ({
  type: REMOVE_ENDTIME_TASKS,
  payload,
});
export const setDescriptionTasks = (payload) => ({
  type: SET_DESCRIPTION_TASKS,
  payload,
});
export const changeTitleTasks = (payload) => ({
  type: CHANGE_TITLE,
  payload,
});
