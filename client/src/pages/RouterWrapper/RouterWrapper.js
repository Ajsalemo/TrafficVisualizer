import { Route } from "react-router-dom";
import { Fragment } from "react";
import Home from "../Home/Home";
import Dashboard from "../Dashboard/Dashboard";
import Navbar from "../../components/Navbar/Navbar";

const RouterWrapper = () => {
  return (
    <Fragment>
      <Navbar />
      <Route exact path="/" component={Home} />
      <Route path="/dashboard" component={Dashboard} />
    </Fragment>
  );
};
export default RouterWrapper;
