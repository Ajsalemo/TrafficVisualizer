import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { Fragment } from "react";
import Footer from "../../components/Footer/Footer";
import LoadingPageComponent from "../../components/LoadingPageComponent/LoadingPageComponent";
import ProfileImage from "../../components/ProfileImage/ProfileImage";
import SavedLocations from "../../components/SavedLocations/SavedLocations";

const Profile = ({ error, userObject }) => {
  const { user, isAuthenticated } = useAuth0();
  // While the user is authenticated and the userObject is loading, return a loading component
  if (!userObject && isAuthenticated) return <LoadingPageComponent />;
  return (
    <Fragment>
      <div className="h-auto">
        <div className="text-center">
          {" "}
          <ProfileImage src={user.picture} />
          <span className="text-white">
            Hi, {user.nickname ? user.nickname : "Guest"}
          </span>
          <SavedLocations userObject={userObject} />
          {error && (
            <span className="text-red-700 block pt-12">
              An error has occured{" "}
              <i className="fas fa-sad-cry text-red-700"></i>
            </span>
          )}
        </div>
      </div>
      <Footer />
    </Fragment>
  );
};

export default withAuthenticationRequired(Profile, {
  onRedirecting: () => <LoadingPageComponent />,
});
