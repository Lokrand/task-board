import {
  ADD_BOARD,
  ADD_QUEUE_TO_BOARD,
  REMOVE_QUEUE_FROM_BOARD,
} from "../actions/actions";

const initialState = {
  boards: [],
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
      const board = state.boards.filter(
        (el) => el.key === action.payload.board
      )[0];
      const removeQueue = board.queue.filter((el) =>  el.key !== action.payload.id);
      board.queue = removeQueue
      for (let i = 0; i < state.boards.length; i++) {
        
      }
      // state.boards.forEach((el) => el.queue.filter((elem) => elem.key !== action.payload.id))
      return {...state}
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
