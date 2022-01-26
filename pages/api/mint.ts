// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { auth } from "../../lib/firebaseAdmin";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const twitterId = (
    await auth.verifyIdToken(req.headers.authorization as string)
  ).firebase.identities["twitter.com"][0];
  res.send({
    data: twitterId,
  });
};

export default handler;
