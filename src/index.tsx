import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./components/App/App";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import { store, persistor } from "./services/reducers/index.js";
import { PersistGate } from "redux-persist/integration/react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router>
          <DndProvider backend={HTML5Backend}>
            <App />
          </DndProvider>
        </Router>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
