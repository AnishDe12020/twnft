import { format } from "date-fns";
import { useEffect, useState } from "react";
import ITweetObject, { ITweetIncludes, ITweetData } from "../types/TweetData";
import { Like, Reply, Retweet } from "./Icons";

interface TweetProps {
  tweetData: ITweetData;
  tweetIncludes: ITweetIncludes;
}

const Tweet = ({ tweetData, tweetIncludes }: TweetProps): JSX.Element => {
  const [quoteTweet, setQuoteTweet] = useState<ITweetObject>();

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
  console.log(tweetIncludes);

  return (
    <div className="flex flex-col p-8 text-white w-[40rem] rounded-2xl bg-secondary">
      <div className="flex flex-col items-start justify-start">
        <div className="flex col">
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
          <p className="ml-4 text-gray-300">
            {format(new Date(tweetData.created_at), "PPP")}
          </p>
        </div>
        <p>{tweetData.text}</p>
        <div className="flex flex-row space-x-4">
          <div className="flex space-x-2">
            <Retweet />
            <p>{tweetData.public_metrics.retweet_count}</p>
          </div>
          <div className="flex space-x-2">
            <Reply />
            <p>{tweetData.public_metrics.reply_count}</p>
          </div>
          <div className="flex space-x-2">
            <Like />
            <p>{tweetData.public_metrics.like_count}</p>
          </div>
        </div>
        <div
          className="grid h-full gap-0.5"
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(12rem, 1fr))",
          }}
        >
          {tweetIncludes.media?.map(media => (
            <img
              src={media.url}
              alt={media.alt_text}
              key={media.media_key}
              className="max-w-48"
            />
          ))}
        </div>
        {quoteTweet && (
          <Tweet
            tweetData={quoteTweet?.data}
            tweetIncludes={quoteTweet?.includes}
          />
        )}
      </div>
    </div>
  );
};

export default Tweet;
