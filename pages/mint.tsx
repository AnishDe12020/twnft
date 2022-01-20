import type { NextPage } from "next";
import { ChangeEvent, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";

const MintPage: NextPage = () => {
  const [tweetData, setTweetData] = useState();
  return (
    <div>
      <Formik
        initialValues={{ link: "" }}
        onSubmit={async (values, { setSubmitting }) => {
          setTweetData(
            await (await fetch(`api/tweet?tweetUrl${values.link}`)).json()
          );
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Field type="text" name="link" />
            <ErrorMessage name="link" />
            <button type="submit">Submit</button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default MintPage;
