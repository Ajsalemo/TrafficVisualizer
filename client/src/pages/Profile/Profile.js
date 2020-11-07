import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import axios from "axios";
import { useEffect, useState } from "react";
import Footer from "../../components/Footer/Footer";
import LoadingPageComponent from "../../components/LoadingPageComponent/LoadingPageComponent";
import ProfileImage from "../../components/ProfileImage/ProfileImage";

const Profile = () => {
  const { user } = useAuth0();
  const [error, setError] = useState(false);
  useEffect(() => {
    // This needs to be cleaned up
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
        console.log(res)
        setError(false);
      })
      .catch((err) => {
        if (err) setError(true);
      });
  }, [user, user.email]);
  console.log(user);
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
        {error && (
          <span className="text-red-700 block pt-12">
            An error has occured <i className="fas fa-sad-cry text-red-700"></i>
          </span>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default withAuthenticationRequired(Profile, {
  onRedirecting: () => <LoadingPageComponent />,
});
