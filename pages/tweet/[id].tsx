import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { TweetFirebaseObject } from "../../types/TweetMetadata";
import getMintedTweet from "../../utils/getMintedTweet";
import getMintedTweets from "../../utils/getMintedTweets";

interface TweetPageProps {
  tweet: TweetFirebaseObject;
}

const TweetPage: NextPage<TweetPageProps> = ({ tweet }) => {
  console.log(tweet);
  return (
    <div>
      <h1>Tweet</h1>
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
