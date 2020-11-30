import { Fragment, useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";
import OrderByMenu from "../OrderByMenu/OrderByMenu";
import DisplayMap from "../DisplayMap/DisplayMap";
import Footer from "../Footer/Footer";
import "../../assets/css/custom.css";

// TODO - component to retrieve saved locations based on the logged in user
const SavedLocations = ({ userObject }) => {
  const [savedLocations, setSavedLocations] = useState(null);
  const [currentLocation, setCurrentLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const { getAccessTokenSilently } = useAuth0();
  // Get a users saved locations
  const getUsersSavedLocations = async () => {
    const { id } = userObject;
    setLoading(true);
    try {
      const token = await getAccessTokenSilently();
      const getRequestForSavedLocations = await axios.get(
        `${process.env.REACT_APP_SERVER_API_URL}/api/get_all_locations/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
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
      const token = await getAccessTokenSilently();
      const deleteSavedUserLocation = await axios.post(
        `${process.env.REACT_APP_SERVER_API_URL}/api/delete_location`,
        {
          location_id: locationId,
          userId: userObject.id,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
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

  const orderByAscending = async () => {
    const { id } = userObject;
    setLoading(true);
    try {
      const token = await getAccessTokenSilently();
      const getRequestForAscOrder = await axios.get(
        `${process.env.REACT_APP_SERVER_API_URL}/api/order_locations_by_asc/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(getRequestForAscOrder.data);
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
      <Fragment>
        <span className="text-white block pt-12">
          <i
            className="fas fa-spinner animate-spin text-white"
            aria-label="loading"
          ></i>
        </span>
        <Footer noSavedLocations={false} loading={loading} />
      </Fragment>
    );
  }

  return savedLocations && savedLocations.length > 0 ? (
    <Fragment>
      <h1 className="text-white text-3xl">Here are your saved locations</h1>
      <ul className="h-40 overflow-scroll overflow-x-hidden mb-24 pb-12 rounded-lg shadow-xl top-12 rounded-md border-solid border-4 border-gray-600 custom-scrollbar">
        <OrderByMenu orderByAscending={orderByAscending} />
        {savedLocations.map((location) => (
          <div className="flex justify-center" key={`${location.id}-div`}>
            <button
              className="focus:outline-none focus:shadow-outline rounded-full py-2 px-4 bg-green-900 text-white mt-4"
              key={`${location.id}-search`}
              disabled={loading}
              onClick={() => setCurrentLocation(location.location)}
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
      {/* Display the map - saved locations are passed down through here */}
      <DisplayMap addressValue={currentLocation} />
      <Footer noSavedLocations={false} loading={loading} />
    </Fragment>
  ) : (
    <div>
      <h2 className="text-white text-3xl">You have no saved locations</h2>
      <i className="fas fa-sad-cry text-blue-700 text-2xl"></i>
      <Footer noSavedLocations={true} loading={loading} />
    </div>
  );
};

export default SavedLocations;
