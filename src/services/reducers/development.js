export const ADD_DEVELOPMENT_TASK = "ADD_DEVELOPMENT_TASK";
export const SET_DEVELOPMENT_END_TIME = "SET_DEVELOPMENT_END_TIME";

const initialState = {
  tasks: [],
};

const removeEl = (state, key) => {
  let result = state.filter((elem) => elem.id !== key);
  state = result;
  console.log("result", result);
  return state;
};

export const development = (state = initialState, action) => {
  switch (action.type) {
    case ADD_DEVELOPMENT_TASK:
      state.tasks.push(action.payload);
      return { ...state };
    default:
      return state;
  }
};

export const addDevelopmentTask = (payload) => ({
  type: ADD_DEVELOPMENT_TASK,
  payload,
});
export const setEndTimeDevelopment = (payload) => ({
  type: SET_DEVELOPMENT_END_TIME,
  payload,
})
