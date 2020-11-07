import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./assets/css/main.css";
import Auth0Provider from "./components/Auth0Provider/Auth0Provider";
import UserHOC from "./components/UserHOC/UserHOC";

ReactDOM.render(
  <BrowserRouter>
    <React.StrictMode>
      <Auth0Provider>
        <UserHOC />
      </Auth0Provider>
    </React.StrictMode>
  </BrowserRouter>,
  document.getElementById("root")
);

