import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { ChakraProvider } from "@chakra-ui/react";
import { TasksProvider } from "./Context/appContext";

ReactDOM.render(
  <TasksProvider>
    <React.StrictMode>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </React.StrictMode>
  </TasksProvider>,
  document.getElementById("root")
);
