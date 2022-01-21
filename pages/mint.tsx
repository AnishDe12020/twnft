import type { NextPage } from "next";
import { ChangeEvent, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { format, formatISO } from "date-fns";
import { Like, Reply, Retweet, Spinner } from "../components/Icons";
import ITweetObject from "../types/TweetData";
import Tweet from "../components/Tweet";
import { HiArrowNarrowRight } from "react-icons/hi";

const MintPage: NextPage = () => {
  const [tweetData, setTweetData] = useState<ITweetObject>();
  return (
    <div className="flex flex-col items-center justify-center">
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
          <Form className="flex items-center px-4 py-2 mt-8 transition duration-200 border-2 border-gray-500 shadow-lg px-w rounded-xl bg-secondary/60 backdrop-filter backdrop-blur-3x focus-within:border-accent hover:border-gray-600 focus-within:hover:border-accent">
            <Field
              type="text"
              name="link"
              placeholder="Tweet URL"
              className="px-4 py-2 text-xl text-gray-300 placeholder-gray-500 bg-transparent border-none focus:outline-none focus:ring-0"
            />
            <ErrorMessage name="link" />
            <button type="submit" className="w-6 h-6 ml-2 text-gray-300">
              {isSubmitting ? (
                <Spinner />
              ) : (
                <HiArrowNarrowRight className="w-6 h-6 hover:opacity-80" />
              )}
            </button>
          </Form>
        )}
      </Formik>
      {tweetData && (
        <Tweet tweetData={tweetData.data} tweetIncludes={tweetData.includes} />
      )}
    </div>
  );
};

export default MintPage;
