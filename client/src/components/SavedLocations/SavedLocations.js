import { Fragment, useEffect, useState } from "react";
import axios from "axios";

// TODO - component to retrieve saved locations based on the logged in user
const SavedLocations = ({ userObject }) => {
  const [savedLocations, setSavedLocations] = useState(null);
  const [loading, setLoading] = useState(false);
  // Get a users saved locations
  const getUsersSavedLocations = async () => {
    const { id } = userObject;
    setLoading(true);
    try {
      const getRequestForSavedLocations = await axios.get(
        `${process.env.REACT_APP_SERVER_API_URL}/api/get_all_locations/${id}`
      );
      const { message } = getRequestForSavedLocations.data;
      setSavedLocations(message);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  // Function to delete saved locations
  const deleteSavedLocation = async (locationId) => {
    setLoading(true);
    try {
      const deleteSavedUserLocation = await axios.post(
        `${process.env.REACT_APP_SERVER_API_URL}/api/delete_location`,
        {
          location_id: locationId,
          userId: userObject.id,
        }
      );
      const { message } = deleteSavedUserLocation.data;
      // After deleting a location, call this function to retrieve updated locations
      if (message) return getUsersSavedLocations();
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUsersSavedLocations();
    // This is to prevent an infinite loop with calling this function
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (loading) {
    return (
      <span className="text-white block pt-12">
        <i
          className="fas fa-spinner animate-spin text-white"
          aria-label="loading"
        ></i>
      </span>
    );
  }

  return savedLocations ? (
    <Fragment>
      <h1 className="text-white text-3xl">Here are your saved locations</h1>
      <ul className="h-40 overflow-scroll overflow-x-hidden">
        {savedLocations.map((location) => (
          <div className="flex justify-center" key={`${location.id}-div`}>
            <button
              className="focus:outline-none focus:shadow-outline rounded-full py-2 px-4 bg-green-900 text-white mt-4"
              key={`${location.id}-search`}
              disabled={loading}
            >
              Go
            </button>
            <li
              className="focus:outline-none focus:shadow-outline rounded-full py-2 px-4 bg-blue-900 text-white mt-4 w-1/2 sm:w-1/4"
              key={location.id}
            >
              {location.location}
            </li>
            <button
              className="focus:outline-none focus:shadow-outline rounded-full py-2 px-4 bg-red-900 text-white mt-4"
              onClick={() => deleteSavedLocation(location.id)}
              disabled={loading}
              key={`${location.id}-delete`}
            >
              X
            </button>
          </div>
        ))}
      </ul>
    </Fragment>
  ) : (
    <span>You have no saved locations : (</span>
  );
};

export default SavedLocations;
