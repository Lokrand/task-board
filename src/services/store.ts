import { createStore, combineReducers, compose } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { boards } from "./boards/boards";
import { modal } from "./modal/modal";
import { tasks } from "./tasks/tasks";

export type RootState = ReturnType<typeof store.getState>;

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["boards", "done", "developments", "queue"],
};

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const rootReducer = combineReducers({
  boards,
  modal,
  tasks,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(persistedReducer);

export const persistor = persistStore(store);
