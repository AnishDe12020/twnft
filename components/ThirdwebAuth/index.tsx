import { useSwitchNetwork, useWeb3 } from "@3rdweb/hooks";
import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import toast from "react-hot-toast";
import { HiClipboardCopy } from "react-icons/hi";
import truncateWalletAddress from "../../utils/truncateWalletAddress";
import { MetamaskLogo, WalletConnectLogo } from "../Icons";

const ThirdWebAuth = (): JSX.Element => {
  const [isOpen, toggleOpen] = useState<boolean>(false);
  const { address, chainId, connectWallet, balance } = useWeb3();
  const { switchNetwork } = useSwitchNetwork();

  const copyAddressToClipboard = (): void => {
    if (!address) return;
    navigator.clipboard.writeText(address);
    toast.success("Address copied to clipboard", {
      style: { backgroundColor: "#333333", color: "#ffffff" },
    });
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={toggleOpen}>
      <Dialog.Trigger>Connect Wallet</Dialog.Trigger>
      <AnimatePresence>
        {isOpen && (
          <Dialog.Portal forceMount>
            <Dialog.Overlay
              className="fixed bg-primary/50 backdrop-blue-lg"
              forceMount
            >
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
                className="p-4 transition duration-200 border-2 border-gray-600 shadow-lg bg-secondary/60 transiton backdrop-filter backdrop-blur-xl hover:border-opacity-60 rounded-2xl"
                forceMount
              >
                <Dialog.Title className="text-xl text-white">
                  Connect Wallet
                </Dialog.Title>
                <div className="flex flex-col mx-4 mt-8 space-y-4">
                  {!address && (
                    <>
                      <button
                        className="flex items-center px-4 py-2 text-lg text-white rounded-lg bg-secondary hover:opacity-60"
                        onClick={() => {
                          connectWallet("injected");
                          console.log("metamask");
                        }}
                      >
                        <MetamaskLogo className="w-8 h-8 mr-2" />
                        Login with Metamask
                      </button>
                      <button
                        className="flex items-center px-4 py-2 text-lg text-white rounded-lg bg-secondary hover:opacity-60"
                        onClick={() => connectWallet("walletconnect")}
                      >
                        <WalletConnectLogo className="w-8 h-8 mr-2" />
                        Login with WalletConnect
                      </button>
                    </>
                  )}

                  {address && (
                    <button
                      className="flex items-center px-3 py-2 space-x-2 text-white rounded-lg bg-secondary w-fit hover:opacity-60"
                      onClick={copyAddressToClipboard}
                    >
                      <p>{truncateWalletAddress(address)}</p>{" "}
                      <span>
                        <HiClipboardCopy />
                      </span>
                    </button>
                  )}
                </div>
              </Dialog.Content>
            </motion.div>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
};

export default ThirdWebAuth;
