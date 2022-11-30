import { ADD_BOARD } from "../actions/actions";

const initialState = {
  boards: [],
};

export const boards = (state = initialState, action) => {
  switch (action.type) {
    case ADD_BOARD:
      console.log(action)
      if (action.payload) {
        state.boards.push(action.payload);
        return { ...state, boards: state.boards };
      }
    default:
      return state;
  }
};

export const addNewBoard = (payload) => ({
  type: ADD_BOARD,
  payload,
})