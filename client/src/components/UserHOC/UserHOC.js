import axios from "axios";
import { Fragment, useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

const UserHOC = ({ children }) => {
  const { user, isAuthenticated } = useAuth0();
  const [error, setError] = useState(false);

  useEffect(() => {
    // This needs to be cleaned up
    if (isAuthenticated) {
      axios
        .get(`${process.env.REACT_APP_SERVER_API_URL}/api/user/${user.email}`)
        .then((res) => {
          console.log(res);
          if (res.data.user_not_found === true) {
            axios
              .post(`${process.env.REACT_APP_SERVER_API_URL}/api/add_user`, {
                user: user,
              })
              .then((newUser) => console.log(newUser));
          }
          console.log(res);
          setError(false);
        })
        .catch((err) => {
          if (err) setError(true);
        });
    }
  }, [user, isAuthenticated]);

  return <Fragment>{children}</Fragment>;
};

export default UserHOC;
