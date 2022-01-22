import { format } from "date-fns";
import { useEffect, useState } from "react";
import ITweetObject, {
  ITweetIncludes,
  ITweetData,
  IEntitiesURLs,
} from "../types/TweetData";
import { Like, Reply, Retweet } from "./Icons";

import twttr from "twitter-text";

interface TweetProps {
  tweetData: ITweetData;
  tweetIncludes: ITweetIncludes;
  isQuoteTweet?: boolean;
}

const Tweet = ({
  tweetData,
  tweetIncludes,
  isQuoteTweet,
}: TweetProps): JSX.Element => {
  const [quoteTweet, setQuoteTweet] = useState<ITweetObject>();
  const [tweetText, setTweetText] = useState<string>(tweetData.text);

  useEffect(() => {
    const fetchQuoteTweet = async () => {
      //   console.log(tweetData.referenced_tweets);
      if (tweetData.referenced_tweets?.[0].type === "quoted") {
        const tweetRes = await fetch(
          `api/tweet?tweetId=${tweetData.referenced_tweets[0].id}`
        );
        const tweetJSON = await tweetRes.text();
        const tweetObj: ITweetObject = JSON.parse(tweetJSON);
        console.log("QUOTE TWEET", tweetObj);
        setQuoteTweet(tweetObj);
      }
    };

    fetchQuoteTweet();
  }, [tweetData?.referenced_tweets]);
  // console.log(tweetIncludes);

  useEffect(() => {
    const parseText = (text: string, urlEntities: IEntitiesURLs[]) => {
      for (const url of urlEntities) {
        if (!url.display_url.startsWith("pic.")) {
          text = text.replace(url.url, url.expanded_url);
        } else {
          text = text.replace(url.url, "");
        }
      }

      console.log(text);

      return text;
    };

    if (tweetData?.entities?.urls) {
      setTweetText(parseText(tweetData.text, tweetData?.entities?.urls));
    }
  }, [tweetData]);

  return (
    <div
      className={`flex flex-col w-auto p-8 text-white ${
        quoteTweet ? "w-[44rem]" : "w-[40rem]"
      } rounded-2xl ${isQuoteTweet ? "bg-[#404040]" : "bg-secondary"}`}
    >
      <div className="flex flex-col items-start justify-start">
        <div className="flex items-center justify-between w-full">
          <div className="flex">
            <img
              src={tweetIncludes.users[0].profile_image_url}
              alt={`{Profile picture for ${tweetIncludes.users[0].username}`}
              className="w-12 h-12 rounded-full"
            />
            <div className="flex flex-col justify-start ml-4">
              <p>{tweetIncludes.users[0].name}</p>
              <p className="mt-1 text-gray-300">
                @{tweetIncludes.users[0].username}
              </p>
            </div>
          </div>
          <p className="mr-8 text-gray-300">
            {format(new Date(tweetData.created_at), "PPP")}
          </p>
        </div>
        <p className="my-4">{tweetText}</p>
        <div className="flex flex-row space-x-6">
          <div className="flex space-x-2 text-red-400">
            <Like />
            <p>{tweetData.public_metrics.like_count}</p>
          </div>
          <div className="flex space-x-2 text-green-400">
            <Retweet />
            <p>{tweetData.public_metrics.retweet_count}</p>
          </div>
          <div className="flex space-x-2 text-blue-400">
            <Reply />
            <p>{tweetData.public_metrics.reply_count}</p>
          </div>
        </div>
        <div
          className="grid h-full gap-3 mt-8"
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(12rem, 1fr))",
          }}
        >
          {tweetIncludes.media?.map(media => (
            <img
              src={media.url}
              alt={media.alt_text}
              key={media.media_key}
              className="max-w-48 rounded-2xl"
            />
          ))}
        </div>
        <div className="mx-8">
          {quoteTweet && !isQuoteTweet && (
            <Tweet
              isQuoteTweet
              tweetData={quoteTweet?.data}
              tweetIncludes={quoteTweet?.includes}
            />
          )}
        </div>
      </div>
      <p className="mt-4 text-sm text-gray-300">
        Created at {format(new Date(), "PPpp")}
      </p>
    </div>
  );
};

export default Tweet;
