import { IBoards } from "../types/data";
import { BoardActionTypes, TBoardsActions } from "./actions";

interface IBoardsState {
  boards: IBoards[];
}

const initialState: IBoardsState = {
  boards: [],
};

export const boards = (
  state = initialState,
  action: TBoardsActions
): IBoardsState => {
  
  switch (action.type) {
    case BoardActionTypes.ADD_BOARD:
      state.boards.push(action.payload);
      return { ...state, boards: state.boards };

    case BoardActionTypes.CHANGE_BOARD_TITLE:
      const findBoard = state.boards.filter(
        (el) => el.key === action.payload.key
      )[0];
      findBoard.title = action.payload.title;
      return { ...state };
    case BoardActionTypes.CHANGE_BOARD_STATUS:
      const oneMoreBoard = state.boards.filter(
        (el) => el.key === action.payload.key
      )[0];
      oneMoreBoard.status = action.payload.status;
      return { ...state };
    case BoardActionTypes.REMOVE_BOARD:
      const removedBoard = state.boards.filter(
        (el) => el.key !== action.payload.key
      );
      return { ...state, boards: removedBoard };
    default:
      return state;
  }
};
