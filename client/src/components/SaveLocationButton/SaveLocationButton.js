import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect, Fragment } from "react";

const SaveLocationButton = ({
  addressValue,
  userObject,
  locationAlreadySaved,
}) => {
  const { isAuthenticated, user } = useAuth0();
  const [checkIfLocationIsSaved, setCheckIfLocationIsSaved] = useState(false);
  const [queryLocationId, setQueryLocationId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  // Function to save the current location to a user profile
  const saveLocationToAccount = async (addressValue, user, userObject) => {
    setLoading(true);
    try {
      await axios.post(
        `${process.env.REACT_APP_SERVER_API_URL}/api/save_location`,
        {
          address: addressValue,
          userEmail: user.name,
          userId: userObject.id,
        }
      );

      // Retrieve the location information after saving it
      const retrieveSavedLocationInfo = await axios.get(
        `${process.env.REACT_APP_SERVER_API_URL}/api/check_location/${addressValue}/${userObject.id}`
      );
      // Set the location_id of the saved traffic location after the save function fires
      // To be saved in state for further operations
      const { location_id, error, message } = retrieveSavedLocationInfo.data;
      if (error === "Location is already saved") {
        setCheckIfLocationIsSaved(true);
      } else if (message === "Location is not saved") {
        setCheckIfLocationIsSaved(false);
      }
      setQueryLocationId(location_id);
      setLoading(false);
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
      if (message === "Location deleted") {
        setCheckIfLocationIsSaved(false);
      }
      setLoading(false);
    } catch (error) {
      if (error) setIsError(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    const getLocationInfoOnLoad = async () => {
      setLoading(true);
      try {
        const { id } = userObject;
        const retrieveSavedLocationInfo = await axios.get(
          `${process.env.REACT_APP_SERVER_API_URL}/api/check_location/${addressValue}/${id}`
        );
        const { message, error, location_id } = retrieveSavedLocationInfo.data;
        // Check the following properties to set the appropriate boolean regarding whether or not a location is already saved
        if (message === "Location is not saved" && locationAlreadySaved === false) {
          setCheckIfLocationIsSaved(false);
        } else if (
          error === "Location is already saved" &&
          locationAlreadySaved === true 
        ) {
          setCheckIfLocationIsSaved(true);
        }
        setQueryLocationId(location_id);
        setLoading(false);
      } catch (error) {
        setIsError(true);
        setLoading(false);
      }
    };
    // If the user is logged in/authenticated then run the async function
    if (isAuthenticated) {
      getLocationInfoOnLoad();
    }
  }, [locationAlreadySaved, addressValue, userObject, isAuthenticated]);

  return (
    <Fragment>
      isAuthenticated && (
      <button
        disabled={loading}
        className={
          checkIfLocationIsSaved === true
            ? "focus:outline-none focus:shadow-outline rounded-full py-2 px-4 bg-red-900 text-white mt-4 mx-auto w-1/2 sm:w-1/4"
            : "focus:outline-none focus:shadow-outline rounded-full py-2 px-4 bg-blue-900 text-white mt-4 mx-auto w-1/2 sm:w-1/4"
        }
        onClick={
          checkIfLocationIsSaved === true
            ? () => deleteSavedTrafficLocation(queryLocationId)
            : () => saveLocationToAccount(addressValue, user, userObject)
        }
      >
        {/* If the loading state is true, show the loading indicator */}
        {loading ? (
          <i className="fas fa-spinner animate-spin"></i>
        ) : checkIfLocationIsSaved === true ? (
          "Remove saved location"
        ) : (
          "Save Location"
        )}
      </button>
      )
      {/* If an error occurs in the try/catch blocks on the onClick functions to save or remove a location, display an error message */}
      {isError && (
        <span className="text-red-900">
          An error occurred while saving the location
        </span>
      )}
    </Fragment>
  );
};

export default SaveLocationButton;
