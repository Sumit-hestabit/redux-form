import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
// import { Values } from "redux-form-website-template";
import store from "./store";
import "./App.css"; 
import App from "./App";
import RegisterPage from "./RegisterPage";
const rootEl = document.getElementById("root");


ReactDOM.render(
  <Provider store={store}>
    <div style={{ padding: 15 }}>
      <RegisterPage/>
      {/* <Values form="simple" /> */}
    </div>
  </Provider>,
  rootEl
);

