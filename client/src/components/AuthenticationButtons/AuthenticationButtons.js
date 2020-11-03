import { useAuth0 } from "@auth0/auth0-react";
import { Fragment } from "react";

const AuthenticationButtons = ({ tailwindClasses }) => {
  const { loginWithRedirect, isAuthenticated, logout, isLoading } = useAuth0();
  // During the login transition, show the loading spinner
  if (isLoading) {
    return <i className="fas fa-spinner animate-spin"></i>;
  }
  
  return isAuthenticated ? (
    <button
      className={tailwindClasses ? tailwindClasses : null}
      onClick={() =>
        logout({
          returnTo: window.location.origin,
        })
      }
    >
      Logout
    </button>
  ) : (
    <Fragment>
      <button
        onClick={() => loginWithRedirect()}
        className={tailwindClasses ? tailwindClasses : null}
      >
        Log in
      </button>
      <button
        className={tailwindClasses ? tailwindClasses : null}
        onClick={() =>
          loginWithRedirect({
            screen_hint: "signup",
          })
        }
      >
        Sign up
      </button>
    </Fragment>
  );
};

export default AuthenticationButtons;
