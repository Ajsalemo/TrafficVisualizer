import DisplayMap from "./DisplayMap";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Fragment, useState } from "react";

export default function MapWrapper() {
  const [addressValue, setAddressValue] = useState("");
  console.log(addressValue);
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
          <Form>
            <Field type="text" name="address" />
            <ErrorMessage name="address" component="div" />
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
      <DisplayMap addressValue={addressValue} />
    </Fragment>
  );
}
