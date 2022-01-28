import { RefObject } from "react";
import ITweetObject from "./TweetData";

interface ITweetContext {
  tweetUrl: string | undefined;
  tweetData: ITweetObject | undefined;
  tweetRef: RefObject<HTMLDivElement> | undefined;
}

export default ITweetContext;
