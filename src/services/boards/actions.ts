import { IBoards } from "../types/data";

export const ADD_BOARD = "ADD_BOARD";
export const REMOVE_BOARD = "REMOVE_BOARD";
export const CHANGE_BOARD_TITLE = "CHANGE_BOARD_TITLE";
export const CHANGE_BOARD_STATUS = "CHANGE_BOARD_STATUS";

export enum BoardActionTypes {
  ADD_BOARD = "ADD_BOARD",
  REMOVE_BOARD = "REMOVE_BOARD",
  CHANGE_BOARD_TITLE = "CHANGE_BOARD_TITLE",
  CHANGE_BOARD_STATUS = "CHANGE_BOARD_STATUS",
}

interface IAddNewBoard {
  type: BoardActionTypes.ADD_BOARD;
  payload: IBoards;
}
interface IChangeBoardTitleAction {
  type: BoardActionTypes.CHANGE_BOARD_TITLE;
  payload: IBoards;
}
interface IChangeBoardStatus {
  type: BoardActionTypes.CHANGE_BOARD_STATUS;
  payload: IBoards;
}
interface IRemoveBoard {
  type: BoardActionTypes.REMOVE_BOARD;
  payload: IBoards;
}

export type TBoardsActions =
  | IAddNewBoard
  | IChangeBoardTitleAction
  | IChangeBoardStatus
  | IRemoveBoard;

export const addNewBoard = (payload: IBoards): TBoardsActions => ({
  type: BoardActionTypes.ADD_BOARD,
  payload,
});

export const changeBoardTitleAction = (payload: IBoards): TBoardsActions => ({
  type: BoardActionTypes.CHANGE_BOARD_TITLE,
  payload,
});

export const changeBoardStatus = (payload: IBoards): TBoardsActions => ({
  type: BoardActionTypes.CHANGE_BOARD_STATUS,
  payload,
});

export const removeBoardAction = (payload: IBoards): TBoardsActions => ({
  type: BoardActionTypes.REMOVE_BOARD,
  payload,
});
