import { createStore, combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { queue } from "./queue";
import { boards } from "./boards";
import { modal } from "./modal";
import { done } from "./done";
import { development } from "./development";
import { tasks } from "./tasks";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ['boards', 'done', 'developments', 'queue'],
};

const rootReducer = combineReducers({
  // queue,
  boards,
  modal,
  // done,
  // development,
  tasks
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(
  persistedReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export const persistor = persistStore(store);
