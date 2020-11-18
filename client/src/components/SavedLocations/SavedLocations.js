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
        console.log(getRequestForSavedLocations.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    getUsersSavedLocations();
  }, [userObject]);
  return (
    <span className="text-white block pt-12">
      {loading ? (
        <i className="fas fa-spinner animate-spin text-white" aria-label="loading"></i>
      ) : (
        <Fragment>
          You currently have no saved traffic locations
          <i className="fas fa-sad-cry text-blue-700"></i>
        </Fragment>
      )}
    </span>
  );
};

export default SavedLocations;
