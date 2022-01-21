import type { NextPage } from "next";
import { ChangeEvent, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { format, formatISO } from "date-fns";
import { Like, Reply, Retweet, Spinner } from "../components/Icons";
import ITweetObject from "../types/TweetData";
import Tweet from "../components/Tweet";

const MintPage: NextPage = () => {
  const [tweetData, setTweetData] = useState<ITweetObject>();
  return (
    <div>
      <Formik
        initialValues={{ link: "" }}
        onSubmit={async (values, { setSubmitting }) => {
          console.log(values);
          const tweetRes = await fetch(`api/tweet?tweetUrl=${values.link}`);
          const tweetJSON = await tweetRes.text();
          const tweetObj: ITweetObject = JSON.parse(tweetJSON);
          console.log(tweetObj);
          setTweetData(tweetObj);
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Field type="text" name="link" />
            <ErrorMessage name="link" />
            <button type="submit" className="text-white bg-black">
              {isSubmitting ? <Spinner /> : "Submit"}
            </button>
          </Form>
        )}
      </Formik>
      {tweetData && <Tweet tweetData={tweetData} />}
    </div>
  );
};

export default MintPage;
