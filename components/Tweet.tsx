import { format } from "date-fns";
import ITweetObject from "../types/TweetData";
import { Like, Reply, Retweet } from "./Icons";

interface TweetProps {
  tweetData: ITweetObject;
}

const Tweet = ({ tweetData }: TweetProps): JSX.Element => {
  return (
    <div className="flex flex-col w-10/12 h-4/6">
      <div className="flex flex-col items-start justify-start">
        <div className="flex space-x-2 col">
          <img
            src={tweetData.includes.users[0].profile_image_url}
            alt={`{Profile picture for ${tweetData.includes.users[0].username}`}
            className="w-12 h-12 rounded-full"
          />
          <div className="flex flex-col justify-start ml-4">
            <p>{tweetData.includes.users[0].name}</p>
            <p>@{tweetData.includes.users[0].username}</p>
          </div>
          <p>{format(new Date(tweetData.data.created_at), "PPP")}</p>
        </div>
        <p>{tweetData.data.text}</p>
        <div className="flex flex-row space-x-4">
          <div className="flex space-x-2">
            <Retweet />
            <p>{tweetData.data.public_metrics.retweet_count}</p>
          </div>
          <div className="flex space-x-2">
            <Reply />
            <p>{tweetData.data.public_metrics.reply_count}</p>
          </div>
          <div className="flex space-x-2">
            <Like />
            <p>{tweetData.data.public_metrics.like_count}</p>
          </div>
        </div>
        <div className="grid grid-cols-2 grid-rows-2">
          {tweetData.includes.media?.map(media => (
            <img src={media.url} alt={media.alt_text} key={media.media_key} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tweet;
