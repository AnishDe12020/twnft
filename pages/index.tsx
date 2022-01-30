import type { NextPage } from "next";
import Link from "next/link";
import Header from "../components/Header";

const Home: NextPage = () => {
  return (
    <>
      <Header />
      <div className="flex flex-col justify-center mt-16 ml-16">
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
      </div>
    </>
  );
};

export default Home;
