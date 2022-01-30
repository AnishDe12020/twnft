import { NextPage } from "next";
import { TwitterLogo } from "../components/Icons";
import useUser from "../hooks/useUser";

const SignInPage: NextPage = () => {
  const { signIn, user, signOutFromApp } = useUser();

  return (
    <div className="flex items-center justify-center h-screen top-1/2">
      {user ? (
        <div className="flex flex-col items-center space-y-4">
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
          <button
            className="px-4 py-2 text-lg text-white bg-red-500 rounded-xl hover:opacity-60 w-fit"
            onClick={signOutFromApp}
          >
            Sign Out
          </button>
        </div>
      ) : (
        <button
          className="px-4 py-2 flex text-white items-center bg-[#1DA1F2] rounded-xl text-xl font-bold hover:opacity-60"
          onClick={signIn}
        >
          <TwitterLogo className="w-8 h-8 mr-3" />
          Sign In with Twitter
        </button>
      )}
    </div>
  );
};

export default SignInPage;
