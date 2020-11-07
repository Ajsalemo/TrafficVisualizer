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
      axios
        .get(`${process.env.REACT_APP_SERVER_API_URL}/api/user/${user.email}`)
        .then((res) => {
          if (res.data.user_not_found === true) {
            axios
              .post(`${process.env.REACT_APP_SERVER_API_URL}/api/add_user`, {
                user: user,
              })
              .then((newUser) => console.log(newUser));
          }
          setUserObject(res.data.user);
          setError(false);
        })
        .catch((err) => {
          if (err) setError(true);
        });
    }
  }, [user, isAuthenticated]);

  return <RouterWrapper userObject={userObject} error={error} />;
};

export default UserHOC;
