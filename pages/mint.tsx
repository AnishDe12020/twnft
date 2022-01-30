import type { NextPage } from "next";
import { ChangeEvent, createContext, useRef, useState, RefObject } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { format, formatISO } from "date-fns";
import { Like, Reply, Retweet, Spinner } from "../components/Icons";
import ITweetObject from "../types/TweetData";
import Tweet from "../components/Tweet";
import { HiArrowNarrowRight } from "react-icons/hi";
import ITweetOptions from "../types/TweetOptions";
import TweetOption from "../components/TweetOption";
import { HiCalendar, HiPhotograph } from "react-icons/hi";
import { FaQuoteLeft } from "react-icons/fa";
import TweetOptionButtons from "../components/TweetOptionButtons";
import ThirdWebAuth from "../components/ThirdwebAuth";
import dynamic from "next/dynamic";
import * as Yup from "yup";
import ITweetContext from "../types/TweetContext";
import useUser from "../hooks/useUser";

const TweetImageDropdown = dynamic(
  () => import("../components/TweetImageDropdown"),
  { ssr: false }
);

export const TweetContext = createContext<ITweetContext>({
  tweetUrl: undefined,
  tweetData: undefined,
  tweetRef: undefined,
});

const TweetURLFormSchema = Yup.object().shape({
  link: Yup.string()
    .required("Required!")
    .matches(/^https?:\/\/twitter\.com\/(?:#!\/)?(\w+)\/status(es)?\/(\d+)$/, {
      message: "Invalid Tweet URL",
    }),
});

const MintPage: NextPage = () => {
  const [tweetData, setTweetData] = useState<ITweetObject>();
  const [tweetOptions, setTweetOptions] = useState<ITweetOptions>({
    likes: true,
    replies: true,
    retweets: true,
    date: true,
    quoteTweet: true,
    media: true,
  });

  const [tweetUrl, setTweetUrl] = useState<string>("");

  const { user } = useUser();

  const toggleTweetOption = (option: keyof ITweetOptions) => {
    setTweetOptions({
      ...tweetOptions,
      [option]: !tweetOptions[option],
    });
  };

  const tweetRef = useRef<HTMLDivElement>(null);

  return (
    <TweetContext.Provider
      value={{
        tweetUrl: tweetUrl,
        tweetData: tweetData,
        tweetRef: tweetRef,
      }}
    >
      <div className="flex flex-col items-center justify-center">
        <Formik
          initialValues={{ link: "" }}
          onSubmit={async (values, { setSubmitting }) => {
            console.log(values);
            setTweetUrl(values.link);
            const tweetRes = await fetch(`api/tweet?tweetUrl=${values.link}`, {
              headers: {
                authorization: await user?.getIdToken(),
              },
            });
            const tweetJSON = await tweetRes.text();
            const tweetObj: ITweetObject = JSON.parse(tweetJSON);
            console.log(tweetObj);
            setTweetData(tweetObj);
            setSubmitting(false);
          }}
          validationSchema={TweetURLFormSchema}
        >
          {({ isSubmitting, errors }) => (
            <Form className="sticky flex items-center px-4 py-2 mx-8 transition duration-200 border-2 border-gray-600 shadow-lg top-8 px-w rounded-xl bg-secondary/10 backdrop-filter backdrop-blur-md focus-within:border-accent hover:border-opacity-60 focus-within:hover:border-accent">
              <div className="flex flex-col space-y-2">
                <Field
                  type="text"
                  name="link"
                  placeholder="Tweet URL"
                  className="px-4 py-2 text-xl text-gray-300 placeholder-gray-500 bg-transparent border-none focus:outline-none focus:ring-0"
                />
                {errors.link && (
                  <p className="mx-4 text-sm text-red-500">{errors.link}</p>
                )}
              </div>
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
            <div className="bg-transparent" ref={tweetRef}>
              <Tweet
                tweetData={tweetData.data}
                tweetIncludes={tweetData.includes}
                tweetOptions={tweetOptions}
              />
            </div>
          )}
        </div>
        <div className="fixed flex flex-wrap items-center justify-center p-2 mx-8 space-x-2 space-y-4 transition duration-200 border-2 border-gray-600 shadow-lg md:space-y-0 hover:border-opacity-60 bottom-8 bg-secondary/10 backdrop-filter backdrop-blur-md rounded-xl">
          <TweetOptionButtons
            toggleTweetOption={toggleTweetOption}
            tweetOptions={tweetOptions}
          />
          <div className="flex space-x-2">
            <TweetImageDropdown tweetRef={tweetRef} />
            <ThirdWebAuth />
          </div>
        </div>
      </div>
    </TweetContext.Provider>
  );
};

export default MintPage;
