import type { NextPage } from "next";
import Header from "../components/Header";

const Home: NextPage = () => {
  return (
    <div>
      <Header />
      <h1 className="text-white">
        {" "}
        <h1>
          Hey there, this is just a project I am working on. If you made it so
          far, please send me a dm on{" "}
          <a
            href="https://twitter.com/AnishDe12020"
            className="text-blue-500 hover:opacity-60"
          >
            Twitter
          </a>{" "}
          telling me where the URL to this website was compromised!
        </h1>
      </h1>
    </div>
  );
};

export default Home;
