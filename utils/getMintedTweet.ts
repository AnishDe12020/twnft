import { db } from "../lib/firebaseAdmin";

const getMintedTweet = async (tweetId: string) => {
  const mintedTweets: any[] = [];
  const mintedTweetsRef = db.collection("nft").doc(tweetId);
  const mintedTweetDoc = await mintedTweetsRef.get();

  return { ...mintedTweetDoc.data(), tweetId: mintedTweetDoc.id };
};

export default getMintedTweet;
