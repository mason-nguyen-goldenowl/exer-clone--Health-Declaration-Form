import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import reportWebVitals from "./reportWebVitals";
import { ChakraProvider } from "@chakra-ui/react";
import { PersistGate } from "redux-persist/lib/integration/react";
import { persistor, store } from "./redux/Configstore";

import App from "./App";

import "./index.scss";

ReactDOM.render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <ChakraProvider>
        <App />
      </ChakraProvider>
      ,
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);

reportWebVitals();
