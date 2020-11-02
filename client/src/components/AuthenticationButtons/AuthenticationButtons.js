import { useAuth0 } from "@auth0/auth0-react";
import { Fragment } from "react";

const AuthenticationButtons = ({ tailwindClasses }) => {
  const { loginWithRedirect, isAuthenticated } = useAuth0();
  return (
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
