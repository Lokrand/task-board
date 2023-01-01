import { TypedUseSelectorHook, useSelector } from "react-redux";
import { RootState } from "../services/reducers/index";

export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector;
