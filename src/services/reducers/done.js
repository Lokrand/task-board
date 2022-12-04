export const ADD_COMPLETED_TASK = "ADD_COMPLETED_TASK";
export const REMOVE_COMPLETED_TASK = "REMOVE_COMPLETED_TASK";

const initialState = {
  tasks: [],
};

const removeEl = (state, key) => {
  let result = state.filter((elem) => elem.id !== key);
  state = result;
  console.log("result", result);
  return state;
};

export const done = (state = initialState, action) => {
  switch (action.type) {
    case ADD_COMPLETED_TASK:
      if (state.tasks) {
        const task = state.tasks.filter((el) => el.id === action.payload.id)[0];
        if (task) {
          return { ...state };
        } else {
          state.tasks.push(action.payload);
          return { ...state };
        }
      } else {
        state.tasks.push(action.payload);
        return { ...state };
      }
    case REMOVE_COMPLETED_TASK:
      console.log("action.payload", action.payload);
      const result = removeEl(state.tasks, action.payload);
      return { ...state, tasks: [...result] };
    default:
      return state;
  }
};

export const addCompletedTask = (payload) => ({
  type: ADD_COMPLETED_TASK,
  payload,
});

export const removeCompletedTask = (payload) => ({
  type: REMOVE_COMPLETED_TASK,
  payload,
});
