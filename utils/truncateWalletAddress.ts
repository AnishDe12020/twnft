const truncateWalletAddress = (walletAddress: string) => {
  // Truncate the wallet address to the first 6 characters and last 4 characters
  return (
    walletAddress.substring(0, 6) +
    "..." +
    walletAddress.substring(walletAddress.length - 4)
  );
};

export default truncateWalletAddress;
