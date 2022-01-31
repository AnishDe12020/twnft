// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { auth } from "../../lib/firebaseAdmin";

const TWITTER_TWEET_API_URL = "https://api.twitter.com/2/tweets/";
const TWITTER_API_MORE_PARAMS =
  "?expansions=author_id,referenced_tweets.id,in_reply_to_user_id,attachments.media_keys,entities.mentions.username,referenced_tweets.id.author_id&tweet.fields=created_at,text,in_reply_to_user_id,referenced_tweets,attachments,public_metrics,entities&user.fields=name,username,verified,profile_image_url&media.fields=media_key,duration_ms,height,preview_image_url,type,url,width,public_metrics,alt_text";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (!req.headers.authorization) {
      throw new Error("Missing authorization header");
    }

    const tweetAuthordId = (
      await auth.verifyIdToken(req.headers.authorization as string)
    ).firebase.identities["twitter.com"][0];

    if (!tweetAuthordId) {
      res.status(401).json({ error: "Unauthorized" });
    }

    let tweetId: string = "";
    if (req.query.tweetId) {
      tweetId = req.query.tweetId as string;
    } else {
      const tweetUrl = req.query.tweetUrl as string;
      tweetId = tweetUrl.split("/")[5];
    }

    const URL = TWITTER_TWEET_API_URL + tweetId + TWITTER_API_MORE_PARAMS;
    const twitterRes = await fetch(URL, {
      headers: {
        Authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN}`,
      },
      method: "GET",
      redirect: "follow",
    });
    const twitterData = await twitterRes.json();
    res.status(200).json(twitterData);
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

export default handler;
