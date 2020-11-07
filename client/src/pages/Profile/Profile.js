import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import Footer from "../../components/Footer/Footer";
import LoadingPageComponent from "../../components/LoadingPageComponent/LoadingPageComponent";
import ProfileImage from "../../components/ProfileImage/ProfileImage";

const Profile = () => {
  const { user } = useAuth0();
  return (
    <div className="h-screen">
      <div className="text-center">
        {" "}
        <ProfileImage src={user.picture} />
        <span className="text-white">
          Hi, {user.nickname ? user.nickname : "Guest"}
        </span>
        <span className="text-white block pt-12">
          You currently have no saved traffic locations{" "}
          <i className="fas fa-sad-cry text-blue-700"></i>
        </span>
        {/* {error && (
          <span className="text-red-700 block pt-12">
            An error has occured <i className="fas fa-sad-cry text-red-700"></i>
          </span>
        )} */}
      </div>
      <Footer />
    </div>
  );
};

export default withAuthenticationRequired(Profile, {
  onRedirecting: () => <LoadingPageComponent />,
});
