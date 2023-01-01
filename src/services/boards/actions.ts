import { AsyncKeyword } from "typescript";

export const ADD_BOARD = "ADD_BOARD";
export const REMOVE_BOARD = "REMOVE_BOARD";
export const CHANGE_BOARD = "CHANGE_BOARD";
export const CHANGE_BOARD_TITLE = "CHANGE_BOARD_TITLE";
export const CHANGE_BOARD_STATUS = "CHANGE_BOARD_STATUS";

export enum BoardActionTypes {
  ADD_BOARD = "ADD_BOARD",
  REMOVE_BOARD = "REMOVE_BOARD",
  CHANGE_BOARD = "CHANGE_BOARD",
  CHANGE_BOARD_TITLE = "CHANGE_BOARD_TITLE",
  CHANGE_BOARD_STATUS = "CHANGE_BOARD_STATUS",
}

interface IAddNewBoard {
  type: BoardActionTypes.ADD_BOARD;
  payload: string;
}
interface IChangeBoardTitleAction {
  type: BoardActionTypes.CHANGE_BOARD_TITLE;
  payload: any;
}
interface IChangeBoardStatus {
  type: BoardActionTypes.CHANGE_BOARD_STATUS;
  payload: string;
}
interface IRemoveBoard {
  type: BoardActionTypes.REMOVE_BOARD;
  payload: string;
}



export const addNewBoard = (payload) => ({
  type: ADD_BOARD,
  payload,
});

export const changeBoardTitleAction = (payload) => ({
  type: CHANGE_BOARD_TITLE,
  payload,
});
export const changeBoardStatus = (payload) => ({
  type: CHANGE_BOARD_STATUS,
  payload,
});
export const removeBoardAction = (payload) => ({
  type: REMOVE_BOARD,
  payload,
});

export const reorderQueue = (payload) => ({
  type: QUEUE_REORDER,
  payload,
});
