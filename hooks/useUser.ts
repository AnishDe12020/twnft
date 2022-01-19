import { signInWithPopup, TwitterAuthProvider, User } from "firebase/auth";
import { useState } from "react";

import { auth } from "../lib/firebase";

const useUser = () => {
  const provider = new TwitterAuthProvider();

  const [twitterAccountId, setTwitterAccountId] = useState<string>();

  const [user, setUser] = useState<User | null>(null);

  const signIn = () => {
    signInWithPopup(auth, provider).then(result => {
      const userRes: User = result.user;
      setUser(userRes);

      setTwitterAccountId(userRes.providerData[0].uid);
    });
  };

  return { signIn, twitterAccountId, user };
};

export default useUser;
