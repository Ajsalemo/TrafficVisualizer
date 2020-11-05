import axios from "axios";

const saveLocationToAccount = async (addressValue) => {
  const postLocation = await axios.post("/api/test_route", {
    address: addressValue,
  });
  const { data } = postLocation;
  return data;
};

const SaveLocationButton = ({ addressValue }) => {
  return (
    <button
      className="focus:outline-none focus:shadow-outline rounded-full py-2 px-4 bg-blue-900 text-white mt-4 mx-auto w-1/2 sm:w-1/4"
      onClick={() => saveLocationToAccount(addressValue)}
    >
      Save location
    </button>
  );
};

export default SaveLocationButton;
