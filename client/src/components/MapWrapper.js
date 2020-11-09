import { ErrorMessage, Field, Form, Formik } from "formik";
import { Fragment, useState } from "react";
import DisplayMap from "./DisplayMap";

const MapWrapper = ({ userObject }) => {
  const [addressValue, setAddressValue] = useState("");

  const handleSubmit = (values, { setSubmitting, resetForm }) => {
    setAddressValue(values.address);
    setSubmitting(false);
    resetForm();
  };

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
      <DisplayMap addressValue={addressValue} userObject={userObject}/>
    </Fragment>
  );
};

export default MapWrapper;
