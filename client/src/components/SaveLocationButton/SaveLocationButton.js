import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect } from "react";

const SaveLocationButton = ({
  addressValue,
  userObject,
  locationAlreadySaved,
  locationId,
}) => {
  const { isAuthenticated, user } = useAuth0();
  const [checkIfLocationIsSaved, setcheckIfLocationIsSaved] = useState(false);

  const saveLocationToAccount = async (addressValue, user, userObject) => {
    const postLocation = await axios.post(
      `${process.env.REACT_APP_SERVER_API_URL}/api/save_location`,
      {
        address: addressValue,
        userEmail: user.name,
        userId: userObject.id,
      }
    );
    // Deconstruct the error object sent back
    const { error } = postLocation.data;
    // An error being sent back is due to the location already saved
    // Set the error boolean to true to display this on the button and disable saving until a non-in use location is selected again
    if (error) setcheckIfLocationIsSaved(true);
    const { data } = postLocation;
    return data;
  };

  const deleteSavedTrafficLocation = () => console.log("Deleted");

  useEffect(() => {
    setcheckIfLocationIsSaved(locationAlreadySaved);
  }, [locationAlreadySaved]);

  return (
    isAuthenticated && (
      <button
        className="
           focus:outline-none focus:shadow-outline rounded-full py-2 px-4 bg-blue-900 text-white mt-4 mx-auto w-1/2 sm:w-1/4"
        onClick={
          checkIfLocationIsSaved || locationAlreadySaved === true
            ? () => deleteSavedTrafficLocation()
            : () => saveLocationToAccount(addressValue, user, userObject)
        }
      >
        {checkIfLocationIsSaved || locationAlreadySaved === true
          ? "Remove saved location"
          : "Save Location"}
      </button>
    )
  );
};

export default SaveLocationButton;
