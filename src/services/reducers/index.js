import { createStore, combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { boards } from "./boards";
import { modal } from "./modal";
import { tasks } from "./tasks";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ['boards', 'done', 'developments', 'queue'],
};

const rootReducer = combineReducers({

  boards,
  modal,

  tasks
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(
  persistedReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export const persistor = persistStore(store);
