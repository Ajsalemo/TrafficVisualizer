import Footer from "../../components/Footer/Footer";
import LoadingPageComponent from "../../components/LoadingPageComponent/LoadingPageComponent";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { useEffect } from "react";
import axios from "axios";
import ProfileImage from "../../components/ProfileImage/ProfileImage";

const Profile = () => {
  const { user } = useAuth0();
  // Placefolder function
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_API_URL}/api/users_general`)
      .then((res) => console.log(res));
  }, []);
  console.log(user);
  return (
    <div className="h-screen">
      <div className="mx-auto text-center">
        {" "}
        <ProfileImage src={user.picture} />
        <span className="text-white">
          Hi, {user.nickname ? user.nickname : "Guest"}
        </span>
      </div>
      <Footer />
    </div>
  );
};

export default withAuthenticationRequired(Profile, {
  onRedirecting: () => <LoadingPageComponent />,
});
