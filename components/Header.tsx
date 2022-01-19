import {

  getRedirectResult,
  signInWithPopup,
  TwitterAuthProvider,
} from "firebase/auth";

import { auth } from "../lib/firebase";

const Header = (): JSX.Element => {
  const provider = new TwitterAuthProvider();

  const signIn = () =>
    signInWithPopup(auth, provider).then(result => {
      const credential = TwitterAuthProvider.credentialFromResult(result);

      const user = result.user;

      console.log("Credential: ", credential);
      console.log("User: ", user);
    });

  return (
    <nav className="flex justify-end">
      <button
        className="p-2 text-white bg-blue-500 rounded-full"
        onClick={signIn}
      >
        Sign In with Twitter
      </button>
    </nav>
  );
};

export default Header;
