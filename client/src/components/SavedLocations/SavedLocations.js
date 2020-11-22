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
  return savedLocations ? (
    <Fragment>
      <h1 className="text-white text-3xl">Here are your saved locations</h1>
      <ul className="h-40 overflow-scroll overflow-x-hidden">
        {savedLocations.map((location) => (
          <div className="flex justify-center">
            <button className="focus:outline-none focus:shadow-outline rounded-full py-2 px-4 bg-green-900 text-white mt-4">
              Go
            </button>
            <li
              className="focus:outline-none focus:shadow-outline rounded-full py-2 px-4 bg-red-900 text-white mt-4 w-1/2 sm:w-1/4"
              key={location.id}
            >
              {location.location}
            </li>
            <button className="focus:outline-none focus:shadow-outline rounded-full py-2 px-4 bg-red-900 text-white mt-4">
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
