export const OPEN_MODAL = "OPEN_MODAL";
export const CLOSE_MODAL = "CLOSE_MODAL";
export const SET_CURRENT_TASK = "SET_CURRENT_TASK";
const initialState = {
  active: false,
  currentTask: [],
};

export const modal = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_MODAL:
      return {
        active: true
      };
    case CLOSE_MODAL:
      return {
        active: false
      };
      case SET_CURRENT_TASK:
        return {
          ...state, currentTask: action.payload
        }
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
})
