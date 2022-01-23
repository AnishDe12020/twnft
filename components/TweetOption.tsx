import { ReactChild } from "react";
import TweetOptions from "../types/TweetOptions";

interface TweetOptionProps {
  toggleTweetOption: (option: keyof TweetOptions) => void;
  optionName: keyof TweetOptions;
  tweetOptions: TweetOptions;
  children: ReactChild;
}

const TweetOption = ({
  toggleTweetOption,
  optionName,
  tweetOptions,
  children,
}: TweetOptionProps): JSX.Element => {
  return (
    <button
      onClick={() => toggleTweetOption(optionName)}
      className={`text-white hover:opacity-60 p-2 rounded-lg bg-opacity-20 ${
        tweetOptions[optionName] && "bg-gray-300"
      }`}
    >
      {children}
    </button>
  );
};

export default TweetOption;
