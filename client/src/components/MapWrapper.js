import DisplayMap from "./DisplayMap";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Fragment, useState } from "react";

export default function MapWrapper() {
  const [addressValue, setAddressValue] = useState("");
  return (
    <Fragment>
      <Formik
        initialValues={{ address: "" }}
        validate={(values) => {
          const errors = {};
          if (!values.address) {
            errors.address = "Required";
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setAddressValue(values.address);
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form className="flex justify-center py-12">
            <div className="w-full flex justify-center flex-row sm:w-1/2 mx-auto rounded-full py-2 px-4 border-solid border-4 border-gray-600">
              <Field
                type="text"
                name="address"
                className="w-full flex-grow"
              />
              <i className="fas fa-search text-blue-900 pl-1"></i>
              <ErrorMessage name="address" component="div" />
              {/* <button type="submit" disabled={isSubmitting} className="w-ft">
                Submit
              </button> */}
            </div>
          </Form>
        )}
      </Formik>
      <DisplayMap addressValue={addressValue} />
    </Fragment>
  );
}
