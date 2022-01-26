import { useContext } from "react";
import { TweetContext } from "../pages/mint";

const useTweetUrl = () => {
  const tweetUrl = useContext(TweetContext);

  return tweetUrl;
};

export default useTweetUrl;
