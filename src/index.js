import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import { ChakraProvider } from "@chakra-ui/react";

import App from "./App";

import "./index.scss";

ReactDOM.render(
  <ChakraProvider>
    <App />
  </ChakraProvider>,
  document.getElementById("root")
);

reportWebVitals();
