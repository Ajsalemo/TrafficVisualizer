import Footer from "../../components/Footer/Footer";
import LoadingPageComponent from "../../components/LoadingPageComponent/LoadingPageComponent";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";

const Profile = () => {
  const { user } = useAuth0();
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
