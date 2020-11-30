import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import RouterWrapper from "../../pages/RouterWrapper/RouterWrapper";

const UserHOC = () => {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [error, setError] = useState(false);
  const [userObject, setUserObject] = useState(null);

  useEffect(() => {
    const retrieveOrAddUserAccount = async () => {
      // This will only run if a user is logged in
      if (isAuthenticated) {
        try {
          // Use this Auth0 method to silently get an access token without having to login again
          // Pass this variable in to each request so the Flask API can decode this
          const token = await getAccessTokenSilently();
          // Make a request to check if the user exists already in Postgres through the Flask API
          const findUserByEmailAddress = await axios.get(
            `${process.env.REACT_APP_SERVER_API_URL}/api/user/${user.email}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          // If the user isn't found, then add the user
          const { user_not_found } = await findUserByEmailAddress.data;
          if (user_not_found) {
            const addUserIfNotFound = await axios.post(
              `${process.env.REACT_APP_SERVER_API_URL}/api/add_user`,
              {
                user: user,
              }
            );
            const { message } = await addUserIfNotFound.data;
            // If the message property is on the response, then the user has been added
            if (message) {
              const findUserAfterInserting = await axios.get(
                `${process.env.REACT_APP_SERVER_API_URL}/api/user/${user.email}`,
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              );
              const findUserAfterInsertingResult = await findUserAfterInserting
                .data.user;
              setUserObject(findUserAfterInsertingResult);
            }
          } else {
            // If the user IS found the user information from Postgres/Flask is retrieved
            const getAlreadyExistingUser = await axios.get(
              `${process.env.REACT_APP_SERVER_API_URL}/api/user/${user.email}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            const getAlreadyExistingUserResult = await getAlreadyExistingUser
              .data.user;
            setUserObject(getAlreadyExistingUserResult);
          }
        } catch (err) {
          // Catch the error, set it to a boolean to produce a custom message if error is true
          if (err) setError(true);
        }
      }
    };
    retrieveOrAddUserAccount();
  }, [isAuthenticated, user, getAccessTokenSilently]);
  // Pass the userObject and error boolean down as props
  return <RouterWrapper userObject={userObject} error={error} />;
};

export default UserHOC;
