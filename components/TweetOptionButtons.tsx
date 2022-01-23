import { FaQuoteLeft } from "react-icons/fa";
import { HiCalendar, HiPhotograph } from "react-icons/hi";
import ITweetOptions from "../types/TweetOptions";
import { Like, Reply, Retweet } from "./Icons";
import TweetOption from "./TweetOption";

interface TweetOptionButtonsProps {
  tweetOptions: ITweetOptions;
  toggleTweetOption: (option: keyof ITweetOptions) => void;
}

const TweetOptionButtons = ({
  tweetOptions,
  toggleTweetOption,
}: TweetOptionButtonsProps): JSX.Element => {
  return (
    <div className="flex space-x-2">
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
  );
};

export default TweetOptionButtons;
