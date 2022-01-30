import type { NextPage } from "next";
import Link from "next/link";
import Header from "../components/Header";
import { Logo } from "../components/Icons";
import { MdDashboardCustomize } from "react-icons/md";

const Home: NextPage = () => {
  return (
    <>
      <Header />
      <div className="flex flex-col justify-center mt-8 ml-16">
        <Logo className="self-center w-48 h-48 mb-8" />
        <h1 className="text-5xl text-center text-white">
          Mint your tweets as{" "}
          <span className="font-bold text-transparent bg-clip-text bg-gradient-to-tr from-pink-400 to-blue-400">
            NFTs
          </span>{" "}
          and sell them on OpenSea
        </h1>
        <div className="flex justify-center mt-16 space-x-4">
          <a
            className="text-white bg-[#2882e0] px-4 py-2 rounded-xl text-xl w-fit hover:opacity-60"
            target="_blank"
            rel="noopener noreferrer"
            href="https://testnets.opensea.io/collection/twnft"
          >
            See our collection on OpenSea
          </a>
          <Link href="/mint" passHref>
            <a className="relative z-10 px-3 py-2 mr-8 text-xl text-white rounded-lg text-md bg-gradient-to-tr from-pink-700 to-blue-700 before:absolute before:inset-0 before:bg-gradient-to-bl before:from-pink before:opacity-0 before:-z-10 before:transition before:duration-500 before:hover:opacity-100 before:rounded-lg">
              Mint your tweet as an NFT
            </a>
          </Link>
        </div>

        <div className="flex justify-around mt-16 space-x-4 text-white">
          <div className="flex flex-col items-center justify-center w-64">
            <MdDashboardCustomize className="w-12 h-12 mb-2" />
            <h3 className="text-lg font-semibold">Customizable tweet image</h3>
            <p className="text-center text-gray-300">
              You can hide/show items in the tweet like likes, retwets replies,
              quote tweets, etc.
            </p>
          </div>
          <div className="flex flex-col items-center justify-center w-64">
            <MdDashboardCustomize className="w-12 h-12 mb-2" />
            <h3 className="text-lg font-semibold">Customizable tweet image</h3>
            <p className="text-center text-gray-300">
              You can hide/show items in the tweet like likes, retwets replies,
              quote tweets, etc.
            </p>
          </div>
          <div className="flex flex-col items-center justify-center w-64">
            <MdDashboardCustomize className="w-12 h-12 mb-2" />
            <h3 className="text-lg font-semibold">Customizable tweet image</h3>
            <p className="text-center text-gray-300">
              You can hide/show items in the tweet like likes, retwets replies,
              quote tweets, etc.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
