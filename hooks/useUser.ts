import {
  TwitterAuthProvider,
  User,
  onAuthStateChanged,
  signOut,
  signInWithRedirect,
} from "firebase/auth";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import { auth } from "../lib/firebase";

const useUser = () => {
  const provider = new TwitterAuthProvider();

  const [twitterAccountId, setTwitterAccountId] = useState<string | null>();

  const [user, setUser] = useState<User | null>(auth.currentUser);

  useEffect(() => {
    onAuthStateChanged(auth, setUser);
  }, []);

  const signIn = () => {
    signInWithRedirect(auth, provider);
  };

  const signOutFromApp = () => {
    signOut(auth)
      .then(() => {
        setUser(null);
        setTwitterAccountId(null);
        toast.success("Signed out");
      })
      .catch(err => {
        console.error(err);
        toast.error("Error Signing out");
      });
  };

  return { signIn, twitterAccountId, user, signOutFromApp };
};

export default useUser;
