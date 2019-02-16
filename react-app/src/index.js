import React from "react";
import ReactDOM from "react-dom";
import "./css/main.css";
import Skills from "./components/Skills";
import FormInput from "./components/FormInput";
import { createStore } from "redux";
import reducer from "./reducer";
import { Provider } from "react-redux";

const store = createStore(reducer);
ReactDOM.render(
  <Provider store={store}>
    <div className="container">
      <FormInput />
      <Skills />
    </div>
  </Provider>,
  document.getElementById("root")
);
