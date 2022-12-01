export const OPEN_MODAL = "OPEN_MODAL";
export const CLOSE_MODAL = "CLOSE_MODAL";

const initialState = {
  active: false,
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
