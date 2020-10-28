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
            errors.address = "A location is required";
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setAddressValue(values.address);
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Fragment>
            <Form className="flex flex-col items-center py-12">
              <div className="w-full flex justify-center flex-row sm:w-1/2 mx-auto rounded-full py-2 px-4 border-solid border-4 border-gray-600">
                <Field
                  type="text"
                  name="address"
                  className="w-full flex-grow"
                />
                <button type="submit" disabled={isSubmitting} className="w-ft">
                  <i className="fas fa-search text-blue-900 pl-1"></i>
                </button>
              </div>
              <ErrorMessage name="address" component="span" className="text-red-600" />
            </Form>
          </Fragment>
        )}
      </Formik>
      <DisplayMap addressValue={addressValue} />
    </Fragment>
  );
}
