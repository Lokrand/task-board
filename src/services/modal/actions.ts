export const OPEN_MODAL = "OPEN_MODAL";
export const CLOSE_MODAL = "CLOSE_MODAL";
export const SET_CURRENT_TASK = "SET_CURRENT_TASK";
export const SET_CURRENT_BOARD = "SET_CURRENT_BOARD";

export enum ModalActionTypes {
  OPEN_MODAL = "OPEN_MODAL",
  CLOSE_MODAL = "CLOSE_MODAL",
  SET_CURRENT_TASK = "SET_CURRENT_TASK",
  SET_CURRENT_BOARD = "SET_CURRENT_BOARD",
}

interface IOpenModal {
  type: ModalActionTypes.OPEN_MODAL;
}

interface ICloseModalAction {
  type: ModalActionTypes.CLOSE_MODAL;
}

interface ISetCurrentTask {
  type: ModalActionTypes.SET_CURRENT_TASK;
  payload: any;
}
interface ISetCurrentBoard {
  type: ModalActionTypes.SET_CURRENT_BOARD;
  payload: any;
}

export type TModalActions =
  | IOpenModal
  | ICloseModalAction
  | ISetCurrentTask
  | ISetCurrentBoard;

export const openModal = (): TModalActions => ({
  type: ModalActionTypes.OPEN_MODAL,
});

export const closeModalAction = (): TModalActions => ({
  type: ModalActionTypes.CLOSE_MODAL,
});

export const setCurrentTask = (payload: any): TModalActions => ({
  type: ModalActionTypes.SET_CURRENT_TASK,
  payload,
});
export const setCurrentBoard = (payload: any): TModalActions => ({
  type: ModalActionTypes.SET_CURRENT_BOARD,
  payload,
});
