import { useContext } from "react";
import { TweetContext } from "../pages/mint";

const useTweetContext = () => {
  const { tweetUrl, tweetData, tweetRef } = useContext(TweetContext);

  return { tweetData, tweetRef, tweetUrl };
};

export default useTweetContext;
