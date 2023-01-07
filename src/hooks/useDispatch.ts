import { ThunkAction } from "redux-thunk";
import { Action, ActionCreator } from "redux";
import { useDispatch as dispatchHook } from "react-redux";
import { RootState, store } from "../services/store";
import { TBoardsActions } from "../services/boards/actions";
import { TModalActions } from "../services/modal/actions";
import { TTasksActions } from "../services/tasks/actions";

type TApplicationActions = TBoardsActions | TModalActions | TTasksActions;

export type AppThunk<TReturn = void> = ActionCreator<
  ThunkAction<TReturn, Action, RootState, TApplicationActions>
>;

export type AppDispatch = typeof store.dispatch;
export const useDispatch = () => dispatchHook<AppDispatch>() as AppThunk;
