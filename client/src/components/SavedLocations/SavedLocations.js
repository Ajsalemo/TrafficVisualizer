import { useEffect, useState } from "react"
import axios from "axios";

// TODO - component to retrieve saved locations based on the logged in user
const SavedLocations = ({ userObject }) => {
  console.log(userObject)
  const [savedLocations, setSavedLocations] = useState(null)
  useEffect(() => {
    const getUsersSavedLocations = async () => {
      const getRequestForSavedLocations = await axios.get(`${process.env.REACT_APP_SERVER_API_URL}/api/get_all_locations/${userObject.id}`);
      console.log(getRequestForSavedLocations.data)
    }
    getUsersSavedLocations()
  }, [])
  return (
    <span className="text-white block pt-12">
      You currently have no saved traffic locations{" "}
      <i className="fas fa-sad-cry text-blue-700"></i>
    </span>
  );
};

export default SavedLocations;
