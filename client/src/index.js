import React from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import RouterWrapper from "./pages/RouterWrapper/RouterWrapper";
import "./assets/css/main.css";
import Auth0Provider from "./components/Auth0Provider/Auth0Provider";

ReactDOM.render(
  <BrowserRouter>
    <React.StrictMode>
      <Auth0Provider>
        <RouterWrapper />
      </Auth0Provider>
    </React.StrictMode>
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
