const Footer = (): JSX.Element => {
  return (
    <footer className="flex flex-col items-center justify-center mb-8 space-y-2 text-white">
      <p>
        Made by{" "}
        <a
          className="text-blue-500 hover:opacity-60"
          href="https://twitter.com/AnishDe12020"
          rel="noopener noreferrer"
          target="_blank"
        >
          Anish De
        </a>
      </p>
      <p>
        Check out the{" "}
        <a
          className="text-blue-500 hover:opacity-60"
          href="https://github.com/AnishDe12020/twnft"
          rel="noopener noreferrer"
          target="_blank"
        >
          Source Code
        </a>
      </p>
    </footer>
  );
};

export default Footer;
