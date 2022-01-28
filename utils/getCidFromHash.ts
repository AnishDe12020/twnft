const getCIDFromHash = (ipfsHash: string) => {
  return ipfsHash.split("://")[1];
};

export default getCIDFromHash;
