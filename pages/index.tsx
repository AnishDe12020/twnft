import type { NextPage } from "next";
import Link from "next/link";
import Header from "../components/Header";
import { Logo } from "../components/Icons";
import { MdDashboardCustomize, MdOutlineMoneyOffCsred } from "react-icons/md";
import { TiStar } from "react-icons/ti";
import { NextSeo } from "next-seo";
import SEO from "../seo.config";
import Footer from "../components/Footer";

const Home: NextPage = () => {
  return (
    <>
      <NextSeo {...SEO} />
      <Header />
      <div className="flex flex-col items-center justify-center mx-8 mb-16 md:mx-12 lg:mx-16">
        <Logo className="self-center w-48 h-48 mb-8" />
        <h1 className="text-3xl text-center text-white md:text-4xl lg:text-5xl">
          Mint your tweets as{" "}
          <span className="font-bold text-transparent bg-clip-text bg-gradient-to-tr from-pink-400 to-blue-400">
            NFTs
          </span>{" "}
          and sell them on OpenSea
        </h1>
        <div className="flex justify-center mt-16 space-x-4">
          <a
            className="text-white bg-[#2882e0] px-4 py-2 rounded-xl text-md md:text-lg text-center lg:text-xl w-fit hover:opacity-60"
            target="_blank"
            rel="noopener noreferrer"
            href="https://testnets.opensea.io/collection/twnft"
          >
            See our collection on OpenSea
          </a>
          <Link href="/mint" passHref>
            <a className="relative z-10 px-3 py-2 mr-8 text-center text-white rounded-lg text-md md:text-lg lg:text-xl bg-gradient-to-tr from-pink-700 to-blue-700 before:absolute before:inset-0 before:bg-gradient-to-bl before:from-pink before:opacity-0 before:-z-10 before:transition before:duration-500 before:hover:opacity-100 before:rounded-lg">
              Mint your tweet as an NFT
            </a>
          </Link>
        </div>


        <a href="https://www.producthunt.com/posts/twnft?utm_source=badge-featured&utm_medium=badge&utm_souce=badge-twnft" target="_blank" rel="noopener noreferrer" className="mt-8">
          <img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=331109&theme=dark" alt="TwNFT - Mint your tweets as NFTs for free | Product Hunt" style={{width: "250px", height: "54px"}} width={250} height={54} />
        </a> 

      <div className="flex flex-col items-center justify-center mt-16 space-y-4 text-white md:space-x-8 lg:space-x-16 md:space-y-0 md:justify-around md:flex-row">
          <div className="flex flex-col items-center justify-center w-64">
            <MdDashboardCustomize className="w-12 h-12 mb-2" />
            <h3 className="text-lg font-semibold">Customizable tweet image</h3>
            <p className="text-center text-gray-300">
              You can hide/show items in the tweet like likes, retwets replies,
              quote tweets, etc.
            </p>
          </div>
          <div className="flex flex-col items-center justify-center w-64">
            <MdOutlineMoneyOffCsred className="w-12 h-12 mb-2" />
            <h3 className="text-lg font-semibold">No gas fees</h3>
            <p className="text-center text-gray-300">
              Gas fees are paid by us. You can mint your NFT for free :D
            </p>
          </div>
          <div className="flex flex-col items-center justify-center w-64">
            <TiStar className="w-12 h-12 mb-2" />
            <h3 className="text-lg font-semibold">Unique</h3>
            <p className="text-center text-gray-300">
              Only you can mint your tweets and only one NFT can be minted per
              tweet. You will have the rights to your NFT and will be able to do
              anything with it.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
