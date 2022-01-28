import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { TweetFirebaseObject } from "../../types/TweetMetadata";
import getCIDFromHash from "../../utils/getCidFromHash";
import getMintedTweet from "../../utils/getMintedTweet";
import getMintedTweets from "../../utils/getMintedTweets";

interface TweetPageProps {
  tweet: TweetFirebaseObject;
}

const TweetPage: NextPage<TweetPageProps> = ({ tweet }) => {
  console.log(tweet);
  return (
    <div>
      <h1 className="text-xl text-white text-bold">{tweet.name}</h1>
      <p className="text-gray-300 text-md text-normal">{tweet.description}</p>
      <img
        src={`https://cloudflare-ipfs.com/ipfs/${getCIDFromHash(tweet.image)}`}
        alt={tweet.name}
      />
    </div>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const mintedTweets = await getMintedTweets();
  const paths = mintedTweets.map(tweet => ({
    params: { id: tweet.tweetId },
  }));

  console.log(paths);

  return {
    paths: paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const mintedTweet = await getMintedTweet(params?.id as string);
  console.log(mintedTweet);
  return { props: { tweet: mintedTweet } };
};

export default TweetPage;
