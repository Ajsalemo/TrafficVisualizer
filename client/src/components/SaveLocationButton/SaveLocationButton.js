import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

const saveLocationToAccount = async (addressValue) => {
  const postLocation = await axios.post("/api/save_location", {
    address: addressValue,
  });
  const { data } = postLocation;
  return data;
};

const SaveLocationButton = ({ addressValue }) => {
  const { isAuthenticated } = useAuth0();
  return (
    isAuthenticated && (
      <button
        className="focus:outline-none focus:shadow-outline rounded-full py-2 px-4 bg-blue-900 text-white mt-4 mx-auto w-1/2 sm:w-1/4"
        onClick={() => saveLocationToAccount(addressValue)}
      >
        Save location
      </button>
    )
  );
};

export default SaveLocationButton;
