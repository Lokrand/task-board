import { ADD_BOARD } from "../actions/actions";

const initialState = {
  boards: [],
};

export const queue = (state = initialState, action) => {
  switch (action.type) {
    case ADD_BOARD:
      console.log(action)
      if (action.payload) {
        state.tasks.push(action.payload);
        return { ...state, tasks: state.tasks };
      }
    default:
      return state;
  }
};

export const addNewBoard = (payload) => ({
  type: ADD_BOARD,
  payload,
})