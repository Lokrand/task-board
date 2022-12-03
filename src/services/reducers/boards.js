import {
  ADD_BOARD,
  ADD_QUEUE_TO_BOARD,
  CHANGE_BOARD_STATUS,
  CHANGE_BOARD_TITLE,
  QUEUE_REORDER,
  REMOVE_BOARD,
  REMOVE_QUEUE_FROM_BOARD,
  SET_TASK_END_TIME,
} from "../actions/actions";

const initialState = {
  boards: [],
};

const removeEl = (state, type, key) => {
  for (let i = 0; i < state.length; i++) {
    let result = state[i][type].filter((elem) => elem.id !== key);
    state[i][type] = result;
  }
  return state;
};

const actionToFnMap = {
  ADD_BOARD: (state, payload) => {
    if (payload) {
      state.boards.push(payload);
      return { ...state, boards: state.boards };
    }
  },
};

export const boards = (state = initialState, action) => {
  // const reducer = actionToFcMap[action.type]
  // if (reducer) return reducer(state, action.payload)
  // else return state
  switch (action.type) {
    case ADD_BOARD:
      if (action.payload) {
        state.boards.push(action.payload);
        return { ...state, boards: state.boards };
      }
    case ADD_QUEUE_TO_BOARD:
      const myBoard = state.boards.filter(
        (el) => el.key === action.payload.key
      )[0];
      myBoard.queue.push({
        title: action.payload.title,
        date: action.payload.date,
        id: action.payload.id,
        endTime: null,
      });

      return { ...state };
    case REMOVE_QUEUE_FROM_BOARD:
      const result = removeEl(state.boards, "queue", action.payload.id);
      return { ...state, boards: [...result] };
    case CHANGE_BOARD_TITLE:
      const findBoard = state.boards.filter(
        (el) => el.key === action.payload.key
      )[0];
      findBoard.title = action.payload.title;
      return { ...state };
    case CHANGE_BOARD_STATUS:
      const oneMoreBoard = state.boards.filter(
        (el) => el.key === action.payload.key
      )[0];
      oneMoreBoard.status = action.payload.status;
      return { ...state };
    case REMOVE_BOARD:
      const removedBoard = state.boards.filter(
        (el) => el.key !== action.payload.key
      );
      return { ...state, boards: removedBoard };
    case SET_TASK_END_TIME:
      const myBoardd = state.boards.filter(
        (el) => el.key === action.payload.key
      );
      let myQueue = myBoardd.queue.filter(
        (el) => el.id === action.payload.task.id
      );
      myQueue = action.payload.task;
      return { ...state };
    case QUEUE_REORDER:
      const myBoarddd = state.boards.filter(
        (el) => el.key === action.payload.key
      )[0];
        myBoarddd.queue = [...action.payload.queue]

        return {...state, boards: [...state.boards]};
    default:
      return state;
  }
};

export const addNewBoard = (payload) => ({
  type: ADD_BOARD,
  payload,
});
export const addQueueToBoard = (payload) => ({
  type: ADD_QUEUE_TO_BOARD,
  payload,
});
export const removeQueueFromBoard = (payload) => ({
  type: REMOVE_QUEUE_FROM_BOARD,
  payload,
});
export const changeBoardTitleAction = (payload) => ({
  type: CHANGE_BOARD_TITLE,
  payload,
});
export const changeBoardStatus = (payload) => ({
  type: CHANGE_BOARD_STATUS,
  payload,
});
export const removeBoardAction = (payload) => ({
  type: REMOVE_BOARD,
  payload,
});
export const setTaskEndTime = (payload) => ({
  type: SET_TASK_END_TIME,
  payload,
});
export const reorderQueue = (payload) => ({
  type: QUEUE_REORDER,
  payload,
});
