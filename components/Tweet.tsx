import { format } from "date-fns";
import { useEffect, useState } from "react";
import ITweetObject, {
  ITweetIncludes,
  ITweetData,
  IEntitiesURLs,
} from "../types/TweetData";
import ITweetOptions from "../types/TweetOptions";
import { Like, Logo, Reply, Retweet } from "./Icons";

interface TweetProps {
  tweetData: ITweetData;
  tweetIncludes: ITweetIncludes;
  isQuoteTweet?: boolean;
  tweetOptions: ITweetOptions;
}

const Tweet = ({
  tweetData,
  tweetIncludes,
  isQuoteTweet,
  tweetOptions,
}: TweetProps): JSX.Element => {
  const [quoteTweet, setQuoteTweet] = useState<ITweetObject>();
  const [tweetText, setTweetText] = useState<string>(tweetData.text);

  useEffect(() => {
    setQuoteTweet(undefined);
  }, []);

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
      className={`flex flex-col p-8 text-white justify-center ${
        isQuoteTweet ? "w-[40rem]" : "w-[44rem]"
      } rounded-2xl ${isQuoteTweet ? "bg-[#404040]" : "bg-secondary"}`}
    >
      <div className="flex flex-col items-center justify-center">
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

            {tweetOptions.date && (
              <p className="mr-8 text-gray-300">
                {format(new Date(tweetData.created_at), "PPP")}
              </p>
            )}
          </div>
          <p className="my-4">{tweetText}</p>
          <div className="flex flex-row space-x-6">
            {tweetOptions.likes && (
              <div className="flex space-x-2 text-red-400">
                <Like />
                <p>{tweetData.public_metrics.like_count}</p>
              </div>
            )}
            {tweetOptions.retweets && (
              <div className="flex space-x-2 text-green-400">
                <Retweet />
                <p>{tweetData.public_metrics.retweet_count}</p>
              </div>
            )}
            {tweetOptions.replies && (
              <div className="flex space-x-2 text-blue-400">
                <Reply />
                <p>{tweetData.public_metrics.reply_count}</p>
              </div>
            )}
          </div>
        </div>
        {tweetOptions.media && tweetIncludes?.media?.length > 0 && (
          <div
            className="grid items-center justify-center h-full gap-3 mt-8"
            style={{
              gridTemplateColumns: "repeat(auto-fit, minmax(16rem, 1fr))",
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
        )}
        {quoteTweet && !isQuoteTweet && tweetOptions.quoteTweet && (
          <div className="mt-4">
            <Tweet
              isQuoteTweet
              tweetData={quoteTweet?.data}
              tweetIncludes={quoteTweet?.includes}
              tweetOptions={tweetOptions}
            />
          </div>
        )}
      </div>
      {!isQuoteTweet && (
        <div className="flex items-start justify-between mx-4 mt-4">
          <p className="mt-4 text-sm text-gray-300">
            Created at {format(new Date(), "PPpp")}
          </p>
          <div className="flex items-center space-x-1 text-sm rounded-full bg-secondary">
            <p>Made with</p>
            <Logo className="w-12 h-12" />
          </div>
          {/* <p>Made with TwNFT</p> */}
        </div>
      )}
    </div>
  );
};

export default Tweet;
