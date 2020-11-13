import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect, Fragment } from "react";

const SaveLocationButton = ({
  addressValue,
  userObject,
  locationAlreadySaved,
}) => {
  const { isAuthenticated, user } = useAuth0();
  const [checkIfLocationIsSaved, setcheckIfLocationIsSaved] = useState(false);
  const [checkThroughFormIfLocSaved, setCheckThroughFormIfLocSaved] = useState(
    false
  );
  const [queryLocationId, setQueryLocationId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  // Function to save the current location to a user profile
  const saveLocationToAccount = async (addressValue, user, userObject) => {
    setLoading(true);
    try {
      const postLocation = await axios.post(
        `${process.env.REACT_APP_SERVER_API_URL}/api/save_location`,
        {
          address: addressValue,
          userEmail: user.name,
          userId: userObject.id,
        }
      );
      // Deconstruct the error object sent back
      const { error, message } = postLocation.data;
      // An error being sent back is due to the location already saved
      // Set the error boolean to true to display this on the button and disable saving until a non-in use location is selected again
      // If the message property is on the response then this means it was successfully added to the database
      // Which means the button should now reflect it being as saved
      if (error || message) {
        setcheckIfLocationIsSaved(true);
        setCheckThroughFormIfLocSaved(true);
      }
      const { data } = postLocation;

      // Retrieve the location information after saving it
      const retrieveSavedLocationInfo = await axios.get(
        `${process.env.REACT_APP_SERVER_API_URL}/api/check_location/${addressValue}/${userObject.id}`
      );
      // Set the location_id of the saved traffic location after the save function fires
      // To be saved in state for further operations
      const { location_id } = retrieveSavedLocationInfo.data;
      setQueryLocationId(location_id);
      setLoading(false);

      return data;
    } catch (error) {
      if (error) setIsError(true);
      setLoading(false);
    }
  };

  // Function to delete the currently search location from the user profile - IF it is currently saved as well
  const deleteSavedTrafficLocation = async (queryLocationId) => {
    setLoading(true);
    try {
      const deleteSavedLocation = await axios.post(
        `${process.env.REACT_APP_SERVER_API_URL}/api/delete_location`,
        {
          location_id: queryLocationId,
          userId: userObject.id,
        }
      );

      const { message } = deleteSavedLocation.data;
      // If the message property is returned on the response then the location has been deleted
      if (message) {
        setcheckIfLocationIsSaved(false);
        setCheckThroughFormIfLocSaved(false);
      }
      setLoading(false);
    } catch (error) {
      if (error) setIsError(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    const getLocationInfoOnLoad = async () => {
      const { id } = userObject;
      const retrieveSavedLocationInfo = await axios.get(
        `${process.env.REACT_APP_SERVER_API_URL}/api/check_location/${addressValue}/${id}`
      );
      const { message } = retrieveSavedLocationInfo.data;
      const { location_id } = retrieveSavedLocationInfo.data;
      if (message) {
        setcheckIfLocationIsSaved(false);
        setCheckThroughFormIfLocSaved(false);
      }
      setQueryLocationId(location_id);
    };
    // If the user is logged in/authenticated then run these functions
    if (isAuthenticated) {
      setCheckThroughFormIfLocSaved(locationAlreadySaved);
      getLocationInfoOnLoad();
    }
  }, [locationAlreadySaved, addressValue, userObject, isAuthenticated]);

  return (
    <Fragment>
      isAuthenticated && (
      <button
        disabled={loading}
        className={
          checkIfLocationIsSaved === true || checkThroughFormIfLocSaved === true
            ? "focus:outline-none focus:shadow-outline rounded-full py-2 px-4 bg-red-900 text-white mt-4 mx-auto w-1/2 sm:w-1/4"
            : "focus:outline-none focus:shadow-outline rounded-full py-2 px-4 bg-blue-900 text-white mt-4 mx-auto w-1/2 sm:w-1/4"
        }
        onClick={
          checkIfLocationIsSaved === true || checkThroughFormIfLocSaved === true
            ? () => deleteSavedTrafficLocation(queryLocationId)
            : () => saveLocationToAccount(addressValue, user, userObject)
        }
      >
        {loading ? (
          <i className="fas fa-spinner animate-spin"></i>
        ) : checkIfLocationIsSaved === true ||
          checkThroughFormIfLocSaved === true ? (
          "Remove saved location"
        ) : (
          "Save Location"
        )}
      </button>
      )
      {/* If an error occurs in the try/catch blocks on the onClick functions to save or remove a location, display an error message */}
      {isError && <span className="text-red-900">An error occurred while saving the location</span>}
    </Fragment>
  );
};

export default SaveLocationButton;
