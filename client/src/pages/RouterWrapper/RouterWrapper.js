import { Route } from "react-router-dom";
import { Fragment } from "react";
import Home from "../Home/Home";
import Dashboard from "../Dashboard/Dashboard";
import Profile from "../../pages/Profile/Profile";
import Navbar from "../../components/Navbar/Navbar";

const RouterWrapper = () => {
  return (
    <Fragment>
      <Navbar />
      <Route exact path="/" component={Home} />
      <Route path="/profile" component={Profile} />
      <Route path="/dashboard" component={Dashboard} />
    </Fragment>
  );
};
export default RouterWrapper;
