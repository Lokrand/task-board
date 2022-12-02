import {
  ADD_BOARD,
  ADD_QUEUE_TO_BOARD,
  CHANGE_BOARD_STATUS,
  CHANGE_BOARD_TITLE,
  REMOVE_BOARD,
  REMOVE_QUEUE_FROM_BOARD,
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

export const boards = (state = initialState, action) => {
  switch (action.type) {
    case ADD_BOARD:
      console.log(action);
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
      });

      return { ...state };
    case REMOVE_QUEUE_FROM_BOARD:
      const result = removeEl(state.boards, "queue", action.payload.id);
      return { ...state, boards: result };
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
        )[0];
        return { ...state, boards: removedBoard}
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
})
