import { Route } from "react-router-dom";
import { Fragment } from "react";
import Home from "../Home/Home";

export default function RouterWrapper() {
  return (
    <Fragment>
      <Route exact path="/" component={Home} />
    </Fragment>
  );
}
