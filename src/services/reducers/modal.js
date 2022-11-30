export const SET_MODAL = "SET_MODAL";

const initialState = {
  modalType: "",
};

export const modal = (state = initialState, action) => {
  switch (action.type) {
    case SET_MODAL:
      return {
        modalType: action.payload,
      };
    default:
      return state;
  }
};

export const openModal = (payload) => ({
  type: SET_MODAL,
  payload,
});
