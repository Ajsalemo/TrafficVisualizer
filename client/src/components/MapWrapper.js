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
          <Form className="flex justify-center flex-col pt-12">
            <Field
              type="text"
              name="address"
              className="rounded-full py-2 px-4 border-solid border-4 border-gray-600 w-full sm:w-9/12 mx-auto"
            />
            <ErrorMessage name="address" component="div" />
            <button type="submit" disabled={isSubmitting} className="w-ft">
              Submit
            </button>
          </Form>
        )}
      </Formik>
      <DisplayMap addressValue={addressValue} />
    </Fragment>
  );
}
