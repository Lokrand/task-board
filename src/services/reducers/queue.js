import { ADD_QUEUE } from "../actions/actions";

const initialState = {
  tasks: [],
};

export const queue = (state = initialState, action) => {
  switch (action.type) {
    case ADD_QUEUE:
      console.log(action)
      if (action.payload) {
        state.tasks.push(action.payload);
        return { ...state, tasks: state.tasks };
      }
    default:
      return state;
  }
};

export const AddNewQueueTask = (payload) => ({
  type: ADD_QUEUE,
  payload,
})
