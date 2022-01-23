import type { NextPage } from "next";
import { ChangeEvent, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { format, formatISO } from "date-fns";
import { Like, Reply, Retweet, Spinner } from "../components/Icons";
import ITweetObject from "../types/TweetData";
import Tweet from "../components/Tweet";
import { HiArrowNarrowRight } from "react-icons/hi";
import TweetOptions from "../types/TweetOptions";
import TweetOption from "../components/TweetOption";
import { HiCalendar, HiPhotograph } from "react-icons/hi";
import { FaQuoteLeft } from "react-icons/fa";

const MintPage: NextPage = () => {
  const [tweetData, setTweetData] = useState<ITweetObject>();
  const [tweetOptions, setTweetOptions] = useState<TweetOptions>({
    likes: true,
    replies: true,
    retweets: true,
    date: true,
    quoteTweet: true,
    media: true,
  });

  const toggleTweetOption = (option: keyof TweetOptions) => {
    setTweetOptions({
      ...tweetOptions,
      [option]: !tweetOptions[option],
    });
  };

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
          <Form className="fixed flex items-center px-4 py-2 transition duration-200 border-2 border-gray-500 shadow-lg top-8 px-w rounded-xl bg-secondary/60 backdrop-filter backdrop-blur-xl focus-within:border-accent hover:border-gray-600 focus-within:hover:border-accent">
            <Field
              type="text"
              name="link"
              placeholder="Tweet URL"
              className="px-4 py-2 text-xl text-gray-300 placeholder-gray-500 bg-transparent border-none focus:outline-none focus:ring-0"
            />
            <ErrorMessage name="link" />
            <button type="submit" className="w-6 h-6 ml-2 text-gray-300">
              {isSubmitting ? (
                <Spinner className="text-accent" />
              ) : (
                <HiArrowNarrowRight className="w-6 h-6 hover:text-accent" />
              )}
            </button>
          </Form>
        )}
      </Formik>
      <div className="mt-32 mb-16">
        {tweetData && (
          <Tweet
            tweetData={tweetData.data}
            tweetIncludes={tweetData.includes}
            tweetOptions={tweetOptions}
          />
        )}
      </div>
      <div className="fixed flex p-2 space-x-2 border-2 bottom-8 bg-secondary/60 backdrop-filter backdrop-blur-xl border-secondary rounded-xl">
        <TweetOption
          optionName="likes"
          toggleTweetOption={toggleTweetOption}
          tweetOptions={tweetOptions}
        >
          <Like className="w-6 h-6" />
        </TweetOption>
        <TweetOption
          optionName="replies"
          toggleTweetOption={toggleTweetOption}
          tweetOptions={tweetOptions}
        >
          <Reply className="w-6 h-6" />
        </TweetOption>
        <TweetOption
          optionName="retweets"
          toggleTweetOption={toggleTweetOption}
          tweetOptions={tweetOptions}
        >
          <Retweet className="w-6 h-6" />
        </TweetOption>
        <TweetOption
          optionName="date"
          toggleTweetOption={toggleTweetOption}
          tweetOptions={tweetOptions}
        >
          <HiCalendar className="w-6 h-6" />
        </TweetOption>
        <TweetOption
          optionName="quoteTweet"
          toggleTweetOption={toggleTweetOption}
          tweetOptions={tweetOptions}
        >
          <FaQuoteLeft className="w-6 h-6" />
        </TweetOption>
        <TweetOption
          optionName="media"
          toggleTweetOption={toggleTweetOption}
          tweetOptions={tweetOptions}
        >
          <HiPhotograph className="w-6 h-6" />
        </TweetOption>
      </div>
    </div>
  );
};

export default MintPage;
