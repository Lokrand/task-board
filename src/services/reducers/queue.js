import { ADD_QUEUE, REMOVE_QUEUE, SET_TASK_END_TIME } from "../actions/actions";

const GET_REORDER_QUEUE = "GET_REORDER_QUEUE";
const SET_TASK_DESCRIPTION = "SET_TASK_DESCRIPTION";
const CHANGE_TASK_PRIORITY_HIGH = "CHANGE_TASK_PRIORITY_HIGH";
const CHANGE_TASK_PRIORITY_LOW = "CHANGE_TASK_PRIORITY_LOW";
const SORT_BY_PRIORITY = "SORT_BY_PRIORITY";
const REMOVE_QUEUE_BY_PRIORITY = "REMOVE_QUEUE_BY_PRIORITY";
const SET_ENDTIME_QUEUE = "SET_ENDTIME_QUEUE";
const REMOVE_ENDTIME_QUEUE = "REMOVE_ENDTIME_QUEUE";
const SET_DESCRIPTION_QUEUE = "SET_DESCRIPTION_QUEUE";

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

export const queue = (state = initialState, action) => {
  switch (action.type) {
    case ADD_QUEUE:
      if (action.payload) {
        state.tasks.push(action.payload);
        return { ...state, tasks: state.tasks };
      }
    case GET_REORDER_QUEUE:
      // console.log('res', action.payload)
      const res = fnArr(action.payload, state.tasks);
    // console.log('result my func', res)
    // return {...state, tasks: [...fnArr(action.payload, state.tasks)]}
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
    case REMOVE_QUEUE_BY_PRIORITY:
      const result = removeEl(state.tasks, action.payload);
      return { ...state, tasks: [...result] };
    case REMOVE_QUEUE:
      const resultt = removeEl(state.tasks, action.payload);
      return { ...state, tasks: [...resultt] };
    case SET_ENDTIME_QUEUE:
      const taskEnd = state.tasks.filter(
        (el) => el.id === action.payload.id
      )[0];
      taskEnd.endTime = action.payload.endTime;
      return { ...state };
    case REMOVE_ENDTIME_QUEUE:
      const taskEndd = state.tasks.filter(
        (el) => el.id === action.payload
        )[0];
      if (taskEndd) taskEndd.endTime = null;
      return { ...state };
    case SET_DESCRIPTION_QUEUE:
      const taskDesc = state.tasks.filter(
        (el) => el.id === action.payload.id
        )[0];
        console.lof(action.payload.description)
      taskDesc.description = action.payload.description;
      return { ...state };
    default:
      return state;
  }
};

export const AddNewQueueTask = (payload) => ({
  type: ADD_QUEUE,
  payload,
});

export const getReorderQueue = (payload) => ({
  type: GET_REORDER_QUEUE,
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
export const removeQueueByPriority = (payload) => ({
  type: REMOVE_QUEUE_BY_PRIORITY,
  payload,
});
export const removeQueue = (payload) => ({
  type: REMOVE_QUEUE,
  payload,
});
export const setEndTimeQueue = (payload) => ({
  type: SET_ENDTIME_QUEUE,
  payload,
});
export const removeEndTimeQueue = (payload) => ({
  type: REMOVE_ENDTIME_QUEUE,
  payload,
});
export const setDescriptionQueue = (payload) => ({
  type: SET_DESCRIPTION_QUEUE,
  payload,
});
