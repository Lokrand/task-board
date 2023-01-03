export const OPEN_MODAL = "OPEN_MODAL";
export const CLOSE_MODAL = "CLOSE_MODAL";
export const SET_CURRENT_TASK = "SET_CURRENT_TASK";
export const SET_CURRENT_BOARD = "SET_CURRENT_BOARD";

const initialState = {
  active: false,
  currentTask: null,
  currentBoard: null,
};

export const modal = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_MODAL:
      return {
        active: true,
      };
    case CLOSE_MODAL:
      return {
        active: false,
      };
    case SET_CURRENT_TASK:
      return {
        ...state,
        currentTask: action.payload,
      };
    case SET_CURRENT_BOARD:
      return { ...state, currentBoard: action.payload };
    default:
      return state;
  }
};

export const openModal = () => ({
  type: OPEN_MODAL,
});

export const closeModalAction = () => ({
  type: CLOSE_MODAL,
});

export const setCurrentTask = (payload) => ({
  type: SET_CURRENT_TASK,
  payload,
});
export const setCurrentBoard = (payload) => ({
  type: SET_CURRENT_BOARD,
  payload,
});
