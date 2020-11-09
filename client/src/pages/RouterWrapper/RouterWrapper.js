import { Route } from "react-router-dom";
import { Fragment } from "react";
import Home from "../Home/Home";
import Dashboard from "../Dashboard/Dashboard";
import Profile from "../../pages/Profile/Profile";
import Navbar from "../../components/Navbar/Navbar";

const RouterWrapper = ({ userObject, error }) => {
  return (
    <Fragment>
      <Navbar />
      <Route exact path="/" component={Home} />
      <Route
        path="/profile"
        render={(props) => <Profile {...props} error={error} />}
      />
      <Route
        path="/dashboard"
        render={(props) => (
          <Dashboard {...props} error={error} userObject={userObject} />
        )}
      />
    </Fragment>
  );
};
export default RouterWrapper;
