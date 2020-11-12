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
  const [checkThroughFormIfLocSaved, setCheckThroughFormIfLocSaved] = useState(
    false
  );
  const [queryLocationId, setQueryLocationId] = useState(null);
  const [loading, setLoading] = useState(false);
  console.log(loading);
  
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
      if (error) console.log(error);
      setLoading(false);
    }
  };
  // TODO - This needs to be finished
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
      if (error) console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    const getLocationInfoOnLoad = async () => {
      const retrieveSavedLocationInfo = await axios.get(
        `${process.env.REACT_APP_SERVER_API_URL}/api/check_location/${addressValue}/${userObject.id}`
      );
      const { message } = retrieveSavedLocationInfo.data;
      const { location_id } = retrieveSavedLocationInfo.data;
      if (message) {
        setcheckIfLocationIsSaved(false);
        setCheckThroughFormIfLocSaved(false);
      }
      let conditionallySetLocationId =
        locationId !== null ? locationId : location_id;

      setQueryLocationId(conditionallySetLocationId);
    };
    setCheckThroughFormIfLocSaved(locationAlreadySaved);
    getLocationInfoOnLoad();
  }, [locationAlreadySaved, locationId, addressValue, userObject.id]);

  return (
    isAuthenticated && (
      <button
        disabled={loading}
        className="
           focus:outline-none focus:shadow-outline rounded-full py-2 px-4 bg-blue-900 text-white mt-4 mx-auto w-1/2 sm:w-1/4"
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
  );
};

export default SaveLocationButton;
