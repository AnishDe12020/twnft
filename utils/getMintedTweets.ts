import { db } from "../lib/firebaseAdmin";

const getMintedTweets = async () => {
  const mintedTweets: any[] = [];
  const mintedTweetsRef = db.collection("nft");
  const mintedTweetsSnapshot = await mintedTweetsRef.get();

  mintedTweetsSnapshot.forEach(doc => {
    mintedTweets.push({ ...doc.data(), tweetId: doc.id });
  });
  return mintedTweets;
};

export default getMintedTweets;
