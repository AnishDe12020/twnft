# TwNFT
TwNFT is a simple web application that lets you mint your tweets as NFTs.

Live Demo - [https://twnft.vercel.app/](https://twnft.vercel.app/)

OpenSea collection - [https://testnets.opensea.io/collection/twnft](https://testnets.opensea.io/collection/twnft)

Backend Code - [https://github.com/AnishDe12020/twnft-backend](https://github.com/AnishDe12020/twnft-backend)

Core features:
- Images of tweets that will be minted can be customized
- No gas fees needs to be payed by you, we handle it :)
- Only you can mint your tweets and no one else can. Moreover, only one NFT can be minted per tweet. This is so that every NFT is unique.

## How to use

To get started, login with Twitter and head over to [/mint](https://twnft.vercel.app/mint).

Then, put in the url of the tweet you want to mint in the textbox on the top and click the arrow -

![image](https://user-images.githubusercontent.com/63192115/151762698-712ad481-3bb2-4f1a-afaa-21dcf5ec818c.png)

You should now see a preview of the NFT - 

![image](https://user-images.githubusercontent.com/63192115/151763928-ac7e9eb7-dc62-4b24-b9b4-1316e9bcbe39.png)

You can connect your wallet by clicking the connect wallet button on the options bar. You will be presented with a modal like this - 

![image](https://user-images.githubusercontent.com/63192115/151763975-61a995c5-823c-47ae-acb5-00aa85562a41.png)

We currently only support metamask but walletconnect support should be coming soon.

After that, click the button saying "Mint NFT" on the options bar. You will be presented with a modal to put it a name, and optionally a description for the NFT. After you fill them out, click the submit button - 

![image](https://user-images.githubusercontent.com/63192115/151764106-b8c70741-3137-48bf-b54e-ce083473c29a.png)

You will then get an option to go to the tweet page -

![image](https://user-images.githubusercontent.com/63192115/151765986-fd572f71-408a-4672-b5a2-78f49d96a6fb.png)

The image there might take some time to load. You should see this now - 

![image](https://user-images.githubusercontent.com/63192115/151765928-85dd6012-a1b5-4953-aabc-5044f34a0d40.png)

Note that it might say it is still minting the NFT and this can take some time. Check back after 5-10 minutes and you should see a button that would take you to OpenSea - 

![image](https://user-images.githubusercontent.com/63192115/151764570-4ddb391c-803e-45d7-81a3-292b2454b1fb.png)

Upon visiting OpenSea, you can do whatever you want with your NFT (including lisitng for sale, selling, transferring etc). You own it and it is a part of the TwNFT collection.

## Contributing

This is a NextJS application that uses Tailwind CSS for styling, Firebase for data storage and Twitter authentication and Thirdweb for connecting a ethereum wallet and minting the NFT.

We use `yarn` as our package manager. To install dependencies, run - 
```
yarn install
```

To spin up the site in a development environment, run - 
```
yarn dev
```

Do note that the minting NFT part is taken care by a seperate backend. You can find the repository for it [here](https://github.com/AnishDe12020/twnft-backend)
