// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

const TWITTER_TWEET_API_URL = "https://api.twitter.com/2/tweets/";
const TWITTER_API_MORE_PARAMS = "?expansions=author_id";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    let tweetId: string = "";
    if (req.query.tweetId) {
      tweetId = req.query.tweetId as string;
    } else {
      const tweetUrl = req.query.tweetUrl as string;
      console.log(tweetUrl);
      tweetId = tweetUrl.split("/")[5];
      console.log(tweetId);
    }

    const URL = TWITTER_TWEET_API_URL + tweetId + TWITTER_API_MORE_PARAMS;
    console.log(URL);
    const twitterRes = await fetch(URL, {
      headers: {
        Authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN}`,
      },
      method: "GET",
      redirect: "follow",
    });
    const twitterData = await twitterRes.json();
    console.log(twitterData);
    res.status(200).json(twitterData);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

export default handler;
