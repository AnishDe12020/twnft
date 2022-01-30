import Image from "next/image";
import Link from "next/link";
import useUser from "../hooks/useUser";

const Header = (): JSX.Element => {
  const { signIn, user } = useUser();

  console.log(user);

  return (
    <nav className="flex items-center justify-end px-8 py-4 bg-gray-900">
      <Link href="/mint" passHref>
        <a className="relative z-10 px-4 py-2 mr-8 text-xl font-bold text-white rounded-lg bg-gradient-to-tr from-pink-700 to-blue-700 before:absolute before:inset-0 before:bg-gradient-to-bl before:from-pink before:opacity-0 before:-z-10 before:transition before:duration-500 before:hover:opacity-100 before:rounded-lg">
          Mint NFT
        </a>
      </Link>
      {user ? (
        <div className="flex items-center justify-between p-2 text-white bg-gray-800 rounded-full">
          <p className="ml-2 mr-4">{user.displayName}</p>
          <img
            src={user.providerData[0].photoURL as string}
            alt="Profile Picture"
            className="rounded-full"
            width={48}
            height={48}
          />
        </div>
      ) : (
        <button
          className="p-2 text-white bg-blue-500 rounded-full"
          onClick={signIn}
        >
          Sign In with Twitter
        </button>
      )}
    </nav>
  );
};

export default Header;
