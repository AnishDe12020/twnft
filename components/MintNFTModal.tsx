import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import useTweetUrl from "../hooks/useTweetUrl";
import useUser from "../hooks/useUser";

const MintNFTModal = () => {
  const [isOpen, toggleOpen] = useState<boolean>(false);
  const { user } = useUser();
  const tweetUrl = useTweetUrl();

  const mintNFT = async () => {
    const res = await fetch(`/api/mint?tweetUrl=${tweetUrl}`, {
      headers: {
        authorization: await user?.getIdToken(),
      } as HeadersInit,
    });

    console.log(await res.json());
  };

  return (
    <div>
      <Dialog.Root open={isOpen} onOpenChange={toggleOpen}>
        <Dialog.Trigger className="relative z-10 px-4 py-2 text-white rounded-lg bg-gradient-to-tr from-pink-700 to-blue-700 before:absolute before:inset-0 before:bg-gradient-to-bl before:from-pink before:opacity-0 before:-z-10 before:transition before:duration-500 before:hover:opacity-100 before:rounded-lg">
          Mint NFT
        </Dialog.Trigger>
        <AnimatePresence>
          {isOpen && (
            <Dialog.Portal forceMount>
              <Dialog.Overlay className="fixed bg-primary/50 backdrop-blur-lg">
                <motion.div
                  initial={{ scale: 0.6, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.6, opacity: 0 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                  className="fixed -mt-48 -ml-48 top-1/2 left-1/2 w-96 h-96"
                ></motion.div>
              </Dialog.Overlay>
              <motion.div
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.6, opacity: 0 }}
                transition={{ duration: 0.2, ease: "easeInOut" }}
                className="fixed -mt-48 -ml-48 top-1/2 left-1/2 w-96 h-96"
              >
                <Dialog.Content
                  forceMount
                  className="p-4 transition duration-200 border-2 border-gray-600 shadow-lg bg-secondary/10 transiton backdrop-filter backdrop-blur-md hover:border-opacity-60 rounded-2xl"
                >
                  <div>
                    <button onClick={mintNFT} className="text-white">
                      Mint NFT
                    </button>
                  </div>
                </Dialog.Content>
              </motion.div>
            </Dialog.Portal>
          )}
        </AnimatePresence>
      </Dialog.Root>
    </div>
  );
};

export default MintNFTModal;
