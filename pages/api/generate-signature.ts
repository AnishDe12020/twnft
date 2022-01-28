// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { ThirdwebSDK } from "@3rdweb/sdk";
import { ethers } from "ethers";
import type { NextApiRequest, NextApiResponse } from "next";
import { auth, db } from "../../lib/firebaseAdmin";

const TWITTER_TWEET_API_URL = "https://api.twitter.com/2/tweets/";
const TWITTER_API_MORE_PARAMS = "?expansions=author_id";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const reqBody = JSON.parse(req.body as string);
    const tweetAuthordId = (
      await auth.verifyIdToken(req.headers.authorization as string)
    ).firebase.identities["twitter.com"][0];

    const tweetUrl = reqBody.tweetUrl as string;
    let tweetId: string = "";
    if (reqBody.tweetId) {
      tweetId = reqBody.tweetId as string;
    } else {
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
    const tweetData = await twitterRes.json();
    console.log(tweetData);
    if (tweetData.data.author_id === tweetAuthordId) {
      const tweetRef = db.collection("nft").doc(tweetId);
      const tweetDoc = await tweetRef.get();

      if (!tweetDoc.exists) {
        const nftTweetData = reqBody.tweetData;

        const nftMedatada = {
          name: reqBody.name,
          description: reqBody.description || nftTweetData.data.text,
          image: reqBody.ipfsHash,
          external_url: `https://twnft.vercel.app/tweet/${tweetId}`,
          attributes: [
            {
              display_type: "date",
              trait_type: "date",
              value: Math.floor(
                new Date(nftTweetData.data.created_at).getTime() / 1000
              ),
            },
            {
              display_type: "text",
              trait_type: "Author Name",
              value: nftTweetData.includes.users[0].name,
            },
            {
              display_type: "text",
              trait_type: "Author Username",
              value: nftTweetData.includes.users[0].username,
            },
            {
              display_type: "text",
              trait_type: "content",
              value: nftTweetData.data.text,
            },
            {
              display_type: "text",
              trait_type: "Tweet URL",
              value: tweetUrl,
            },
            {
              display_type: "text",
              trait_type: "Tweet ID",
              value: tweetId,
            },
          ],
        };

        const sdk = new ThirdwebSDK(
          new ethers.Wallet(
            process.env.PRIVATE_KEY as string,
            ethers.getDefaultProvider("https://rinkeby-light.eth.linkpool.io/")
          )
        );

        const nftCollectionRef = db.collection("nft");
        const firebaseRes = await nftCollectionRef.doc(tweetId).set({
          ...nftMedatada,
          created_date: new Date().toISOString(),
          minted: false,
        });

        console.log(firebaseRes);

        const nftModule = sdk.getNFTModule(
          process.env.NEXT_PUBLIC_NFT_MODULE_ADDRESS as string
        );

        console.log(reqBody);

        // const { payload, signature } = await nftModule.generateSignature({
        //   metadata: nftMedatada,
        //   price: 0,
        //   currencyAddress: "0x0",
        //   to: reqBody.receiverAddress as string,
        //   mintStartTimeEpochSeconds: 0,
        //   mintEndTimeEpochSeconds: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
        // });

        const result = await nftModule.mintTo(
          reqBody.receiverAddress as string,
          nftMedatada
        );

        console.log(result);

        res.send({ data: { result } });
      } else {
        res.send({ error: "tweetMinted" });
      }
    } else {
      res.send({ error: "notTweetOwner" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Error generating signature for NFT" });
  }
};

export default handler;
