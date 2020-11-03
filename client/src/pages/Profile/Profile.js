import Footer from "../../components/Footer/Footer";
import LoadingPageComponent from "../../components/LoadingPageComponent/LoadingPageComponent";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import { useEffect } from "react";
import axios from "axios";

const Profile = () => {
  const { user } = useAuth0();
  // Placefolder function
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_API_URL}/api/users_general`)
      .then((res) => console.log(res));
  }, []);
  
  return (
    <div className="h-screen">
      {user.name}
      <Footer />
    </div>
  );
};

export default withAuthenticationRequired(Profile, {
  onRedirecting: () => <LoadingPageComponent />,
});
