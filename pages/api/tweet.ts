// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

const TWITTER_TWEET_API_URL = "https://api.twitter.com/2/tweets/";
const TWITTER_API_MORE_PARAMS =
  "?expansions=author_id,referenced_tweets.id,in_reply_to_user_id,attachments.media_keys,entities.mentions.username,referenced_tweets.id.author_id&tweet.fields=created_at,text,in_reply_to_user_id,referenced_tweets,attachments,public_metrics&user.fields=name,username,verified,profile_image_url&media.fields=media_key,duration_ms,height,preview_image_url,type,url,width,public_metrics,alt_text";

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
