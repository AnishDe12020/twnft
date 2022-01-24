import { useSwitchNetwork, useWeb3 } from "@3rdweb/hooks";
import * as Dialog from "@radix-ui/react-dialog";
import { useState } from "react";
import { MetamaskLogo, WalletConnectLogo } from "../Icons";

const ThirdWebAuth = (): JSX.Element => {
  const [isOpen, toggleOpen] = useState<boolean>(false);
  const { address, chainId, connectWallet, balance } = useWeb3();
  const { switchNetwork } = useSwitchNetwork();

  return (
    <Dialog.Root open={isOpen} onOpenChange={toggleOpen}>
      <Dialog.Trigger>Connect Wallet</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed bg-secondary" />
        <span className="inline-block h-screen align-middle" aria-hidden="true">
          &#8203;
        </span>
        <Dialog.Content className="fixed p-4 -mt-48 -ml-48 bg-secondary rounded-2xl top-1/2 left-1/2 h-96 w-96">
          <Dialog.Title className="text-xl text-white">
            Connect Wallet
          </Dialog.Title>
          <div className="flex flex-col mx-4 mt-8 space-y-4">
            <button
              className="flex items-center px-4 py-2 text-lg text-white bg-gray-700 rounded-lg hover:opacity-60"
              onClick={() => {
                connectWallet("injected");
                console.log("metamask");
              }}
            >
              <MetamaskLogo className="w-8 h-8 mr-2" />
              Login with Metamask
            </button>
            <button
              className="flex items-center px-4 py-2 text-lg text-white bg-gray-700 rounded-lg hover:opacity-60"
              onClick={() => connectWallet("walletconnect")}
            >
              <WalletConnectLogo className="w-8 h-8 mr-2" />
              Login with WalletConnect
            </button>

            {address && <p>{address}</p>}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default ThirdWebAuth;
