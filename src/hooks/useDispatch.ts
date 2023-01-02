import { ThunkAction } from "redux-thunk";
import { Action, ActionCreator } from "redux";
import { useDispatch as dispatchHook } from "react-redux";
import { RootState, store } from "../services/store";

type TApplicationActions = {};

export type AppThunk<TReturn = void> = ActionCreator<
  ThunkAction<TReturn, Action, RootState, TApplicationActions>
>;

export type AppDispatch = typeof store.dispatch;
export const useDispatch = () => dispatchHook<AppDispatch>() as AppThunk;
