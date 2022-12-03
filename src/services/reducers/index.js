import {  createStore, combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { queue } from "./queue";
import { boards } from "./boards";
import { modal } from "./modal";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ['boards'],
};

const rootReducer = combineReducers({
  queue, 
  boards,
  modal
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer);

export const persistor = persistStore(store);