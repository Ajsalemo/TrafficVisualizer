import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

const saveLocationToAccount = async (addressValue, user, userObject) => {
  const postLocation = await axios.post(
    `${process.env.REACT_APP_SERVER_API_URL}/api/save_location`,
    {
      address: addressValue,
      userEmail: user.name,
      userId: userObject.id
    }
  );
  const { data } = postLocation;
  return data;
};

const SaveLocationButton = ({ addressValue, userObject }) => {
  const { isAuthenticated, user } = useAuth0();
  console.log(userObject)
  return (
    isAuthenticated && (
      <button
        className="focus:outline-none focus:shadow-outline rounded-full py-2 px-4 bg-blue-900 text-white mt-4 mx-auto w-1/2 sm:w-1/4"
        onClick={() => saveLocationToAccount(addressValue, user, userObject)}
      >
        Save location
      </button>
    )
  );
};

export default SaveLocationButton;
