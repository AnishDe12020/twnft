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
    <div className="flex flex-col w-10/12 h-4/6">
      <div className="flex flex-col items-start justify-start">
        <div className="flex space-x-2 col">
          <img
            src={tweetIncludes.users[0].profile_image_url}
            alt={`{Profile picture for ${tweetIncludes.users[0].username}`}
            className="w-12 h-12 rounded-full"
          />
          <div className="flex flex-col justify-start ml-4">
            <p>{tweetIncludes.users[0].name}</p>
            <p>@{tweetIncludes.users[0].username}</p>
          </div>
          <p>{format(new Date(tweetData.created_at), "PPP")}</p>
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
        <div className="grid grid-cols-2 grid-rows-2">
          {tweetIncludes.media?.map(media => (
            <img src={media.url} alt={media.alt_text} key={media.media_key} />
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
