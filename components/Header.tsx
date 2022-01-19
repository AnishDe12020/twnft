import useUser from "../hooks/useUser";

const Header = (): JSX.Element => {
  const { signIn, user } = useUser();

  return (
    <nav className="flex justify-end">
      {user ? (
        <div className="flex items-center justify-center text-gray-200 bg-gray-700 rounded-md row">
          <p>{user.displayName}</p>
          <img
            src={user.photoURL}
            alt="Profile Picture"
            className="w-12 h-12"
          />
        </div>
      ) : (
        <button
          className="p-2 text-white bg-blue-500 rounded-full"
          onClick={signIn}
        >
          Sign In with Twitter
        </button>
      )}
    </nav>
  );
};

export default Header;
