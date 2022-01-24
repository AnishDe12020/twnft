import "../styles/globals.css";
import type { AppProps } from "next/app";
import { ThirdwebWeb3Provider } from "@3rdweb/hooks";
import { Toaster } from "react-hot-toast";
const connectors = {
  injected: {},
  walletconnect: {},
};

const supportedChainIds = [1, 4, 137, 250, 43114, 80001];

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebWeb3Provider
      connectors={connectors}
      supportedChainIds={supportedChainIds}
    >
      <Toaster />
      <Component {...pageProps} />
    </ThirdwebWeb3Provider>
  );
}

export default MyApp;
