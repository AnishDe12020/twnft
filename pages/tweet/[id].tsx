import { format } from "date-fns";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { HiExternalLink } from "react-icons/hi";
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
    <div className="flex flex-col mx-8 my-16 space-y-16 md:space-y-0 md:space-x-16 md:flex-row lg:mx-32 md:mx-16">
      <img
        src={`https://cloudflare-ipfs.com/ipfs/${getCIDFromHash(tweet.image)}`}
        alt={tweet.name}
      />
      <div className="flex flex-col mx-4 space-y-8">
        <h1 className="text-2xl text-white text-bold">{tweet.name}</h1>
        <p className="text-gray-300 text-md">{tweet.description}</p>
        <p className="text-gray-300 text-md">
          Created: {format(new Date(tweet.created_date), "PPpp")}
        </p>
        <a
          href={tweet.attributes[4].value as string}
          className="flex items-center text-white text-md hover:opacity-60"
          target="_blank"
          rel="noreferrer noopener"
        >
          <HiExternalLink className="w-6 h-6 mr-4" />
          Go to Tweet
        </a>
      </div>
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
