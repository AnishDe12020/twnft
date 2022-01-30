import { TwitterLogo } from "../components/Icons";
import useUser from "../hooks/useUser";

const SignInPage: NextPage = () => {
  const { signIn } = useUser();

  return (
    <div className="flex items-center justify-center h-screen top-1/2">
      <button
        className="px-4 py-2 flex text-white items-center bg-[#1DA1F2] rounded-xl text-xl font-bold hover:opacity-60"
        onClick={signIn}
      >
        <TwitterLogo className="w-8 h-8 mr-3" />
        Sign In with Twitter
      </button>
    </div>
  );
};

export default SignInPage;
