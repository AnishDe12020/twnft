import Image from "next/image";
import useUser from "../hooks/useUser";

const Header = (): JSX.Element => {
  const { signIn, user } = useUser();

  return (
    <nav className="flex justify-end">
      {user ? (
        <div className="flex items-center justify-between p-2 text-white bg-gray-800 rounded-full">
          <p className="ml-2 mr-4">{user.displayName}</p>
          <Image
            src={user.photoURL as string}
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
