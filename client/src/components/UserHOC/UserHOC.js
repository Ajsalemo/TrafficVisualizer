import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import RouterWrapper from "../../pages/RouterWrapper/RouterWrapper";

const UserHOC = () => {
  const { user, isAuthenticated } = useAuth0();
  const [error, setError] = useState(false);
  const [userObject, setUserObject] = useState(null);

  useEffect(() => {
    if (isAuthenticated) {
      // Make a request to check if the user exists already in Postgres through the Flask API
      axios
        .get(`${process.env.REACT_APP_SERVER_API_URL}/api/user/${user.email}`)
        .then((res) => {
          // If the user isn't found, then add the user
          // If the user IS found, then this block doesn't run - and the user information from Postgres/Flask is retrieved
          if (res.data.user_not_found === true) {
            axios
              .post(`${process.env.REACT_APP_SERVER_API_URL}/api/add_user`, {
                user: user,
              })
              .then((newUser) => console.log(newUser));
          }
          // Set the userObject in state to be used through the application if needed
          setUserObject(res.data.user);
          setError(false);
        })
        .catch((err) => {
          // Catch the error, set it to a boolean to produce a custom message if error is true
          if (err) setError(true);
        });
    }
  }, [user, isAuthenticated]);
  // Pass the userObject and error boolean down as props
  return <RouterWrapper userObject={userObject} error={error} />;
};

export default UserHOC;
