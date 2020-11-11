import { ErrorMessage, Field, Form, Formik } from "formik";
import { Fragment, useState } from "react";
import DisplayMap from "./DisplayMap";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";
import LoadingPageComponent from "./LoadingPageComponent/LoadingPageComponent";

const MapWrapper = ({ userObject }) => {
  const [addressValue, setAddressValue] = useState("");
  const [locationAlreadySaved, setLocationAlreadySaved] = useState(false);
  const [locationId, setlocationId] = useState(null);
  const { isAuthenticated } = useAuth0();

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    // If the user is authenticated then check to see if the location being searched for is already saved in Postgres
    if (isAuthenticated) {
      const checkIfLocationIsSaved = await axios.get(
        `${process.env.REACT_APP_SERVER_API_URL}/api/check_location/${values.address}/${userObject.id}`
      );
      const { error, message, location_id } = checkIfLocationIsSaved.data;
      if (error) setLocationAlreadySaved(true);
      if (message) setLocationAlreadySaved(false);
      if (location_id) setlocationId(location_id);
    }
    setAddressValue(values.address);
    setSubmitting(false);
    resetForm();
  };

  // While the user is authenticated and the userObject is loading, return a loading component
  if (!userObject && isAuthenticated) return <LoadingPageComponent />;
  return (
    <Fragment>
      <Formik
        initialValues={{ address: "" }}
        validate={(values) => {
          const errors = {};
          if (!values.address) {
            errors.address = "A location is required";
          }
          return errors;
        }}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Fragment>
            <Form className="flex flex-col items-center py-12">
              <span className="text-white">
                Search by address or location name.
              </span>
              <div className="w-full flex justify-center flex-row sm:w-1/2 mx-auto rounded-full py-2 px-4 border-solid border-4 border-gray-600">
                <Field
                  type="text"
                  name="address"
                  className="w-full flex-grow bg-black text-white"
                />
                <button type="submit" disabled={isSubmitting} className="w-ft">
                  <i className="fas fa-search text-blue-900 pl-1"></i>
                </button>
              </div>
              <ErrorMessage
                name="address"
                component="span"
                className="text-red-600"
              />
            </Form>
          </Fragment>
        )}
      </Formik>
      <DisplayMap
        addressValue={addressValue}
        userObject={userObject}
        locationAlreadySaved={locationAlreadySaved}
        locationId={locationId}
      />
    </Fragment>
  );
};

export default MapWrapper;
