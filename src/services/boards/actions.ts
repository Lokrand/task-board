import { IBoards } from "../types/data";

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
  payload: { key: string; title: string };
}
interface IChangeBoardStatus {
  type: BoardActionTypes.CHANGE_BOARD_STATUS;
  payload: { key: string; status: boolean };
}
interface IRemoveBoard {
  type: BoardActionTypes.REMOVE_BOARD;
  payload: { key: string };
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

export const changeBoardTitleAction = (payload: {
  key: string;
  title: string;
}): TBoardsActions => ({
  type: BoardActionTypes.CHANGE_BOARD_TITLE,
  payload,
});

export const changeBoardStatus = (payload: {
  key: string;
  status: boolean;
}): TBoardsActions => ({
  type: BoardActionTypes.CHANGE_BOARD_STATUS,
  payload,
});

export const removeBoardAction = (payload: {
  key: string;
}): TBoardsActions => ({
  type: BoardActionTypes.REMOVE_BOARD,
  payload,
});
