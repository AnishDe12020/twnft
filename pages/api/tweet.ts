// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

const TWITTER_TWEET_API_URL = "https://api.twitter.com/2/tweets/";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const tweetUrl = req.query.tweetUrl as string;
    console.log(tweetUrl);
    const tweetId = tweetUrl.split("/")[5];
    console.log(tweetId);
    const twitterRes = await fetch(TWITTER_TWEET_API_URL + tweetId, {
      headers: {
        Authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN}`,
      },
    });
    const twitterData = await twitterRes.json();
    console.log(twitterData);
    res.status(200).json(twitterData);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

export default handler;
