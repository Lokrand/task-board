import { IBoards, ITask } from "../types/data";
import { TModalActions, ModalActionTypes } from "./actions";

interface IModalState {
  active: boolean;
  currentTask: ITask | null;
  currentBoard: IBoards | null;
}

const initialState: IModalState = {
  active: false,
  currentTask: null,
  currentBoard: null,
};

export const modal = (
  state = initialState,
  action: TModalActions
): IModalState => {
  switch (action.type) {
    case ModalActionTypes.OPEN_MODAL:
      return {
        ...state,
        active: true,
      };
    case ModalActionTypes.CLOSE_MODAL:
      return {
        ...state,
        active: false,
      };
    case ModalActionTypes.SET_CURRENT_TASK:
      return {
        ...state,
        currentTask: action.payload,
      };
    case ModalActionTypes.SET_CURRENT_BOARD:
      return { ...state, currentBoard: action.payload };
    default:
      return state;
  }
};
