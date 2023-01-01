import {
  ADD_BOARD,
  CHANGE_BOARD_STATUS,
  CHANGE_BOARD_TITLE,
  REMOVE_BOARD,
} from "../actions/actions";

const initialState = {
  boards: [],
};

export const boards = (state = initialState, action) => {
  switch (action.type) {
    case ADD_BOARD:
      if (action.payload) {
        state.boards.push(action.payload);
        return { ...state, boards: state.boards };
      }
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
    default:
      return state;
  }
};

export const addNewBoard = (payload) => ({
  type: ADD_BOARD,
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
