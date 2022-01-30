import { ReactChild } from "react";
import TweetOptions from "../types/TweetOptions";

interface TweetOptionProps {
  toggleTweetOption: (option: keyof TweetOptions) => void;
  optionName: keyof TweetOptions;
  tweetOptions: TweetOptions;
  children: ReactChild;
  disabled: boolean;
}

const TweetOption = ({
  toggleTweetOption,
  optionName,
  tweetOptions,
  children,
  disabled,
}: TweetOptionProps): JSX.Element => {
  return (
    <button
      onClick={() => toggleTweetOption(optionName)}
      className={`text-white p-2 rounded-lg ${
        disabled
          ? "bg-opacity-10 cursor-not-allowed"
          : "bg-opacity-20 hover:opacity-60"
      } ${tweetOptions[optionName] && "bg-gray-300"}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default TweetOption;
