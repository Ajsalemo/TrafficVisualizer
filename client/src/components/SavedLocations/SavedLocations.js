import { Fragment, useEffect, useState } from "react";
import axios from "axios";

// TODO - component to retrieve saved locations based on the logged in user
const SavedLocations = ({ userObject }) => {
  console.log(userObject);
  const [savedLocations, setSavedLocations] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const { id } = userObject;
    const getUsersSavedLocations = async () => {
      setLoading(true);
      try {
        const getRequestForSavedLocations = await axios.get(
          `${process.env.REACT_APP_SERVER_API_URL}/api/get_all_locations/${id}`
        );
        const { message } = getRequestForSavedLocations.data;
        setSavedLocations(message);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    getUsersSavedLocations();
  }, [userObject]);

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
  // This needs to be updated
  return (
    <ul>
      {savedLocations ? savedLocations.map((location) => (
      <li className="text-white" key={location.id}>{location.location}</li>
      )) : <span>You have no saved locations : (</span>}
    </ul>
  );
};

export default SavedLocations;
