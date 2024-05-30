import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from "react-redux";
import store from "./Redux";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://localhost:5001/api';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <Provider store={store}>
      <App />
    </Provider>
  </>
);
