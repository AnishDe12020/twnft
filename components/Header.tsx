import Image from "next/image";
import Link from "next/link";
import useUser from "../hooks/useUser";
import { Logo, TwitterLogo } from "./Icons";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const Header = (): JSX.Element => {
  const { signIn, user, signOutFromApp } = useUser();
  const [isOpen, setOpen] = useState<boolean>(false);

  console.log(user);

  return (
    <nav className="flex items-center justify-between px-2 py-4 md:px-4 lg:px-8">
      <Logo className="w-12 h-12 md:w-16 md:h-16" />
      <div className="flex items-center">
        <Link href="/mint" passHref>
          <a className="relative z-10 px-3 py-2 mr-2 text-sm font-bold text-white rounded-lg md:mr-4 lg:mr-8 md:text-md bg-gradient-to-tr from-pink-700 to-blue-700 before:absolute before:inset-0 before:bg-gradient-to-bl before:from-pink before:opacity-0 before:-z-10 before:transition before:duration-500 before:hover:opacity-100 before:rounded-lg">
            Mint NFT
          </a>
        </Link>
        {user ? (
          <DropdownMenu.Root open={isOpen} onOpenChange={setOpen}>
            <DropdownMenu.Trigger>
              <div className="flex items-center justify-between p-2 text-white bg-gray-800 rounded-full">
                <p className="ml-2 mr-4">{user.displayName}</p>
                <img
                  src={user.providerData[0].photoURL as string}
                  alt="Profile Picture"
                  className="rounded-full"
                  width={36}
                  height={36}
                />
              </div>
            </DropdownMenu.Trigger>
            <AnimatePresence>
              {isOpen && (
                <DropdownMenu.Content
                  asChild
                  forceMount
                  sideOffset={16}
                  className="flex flex-col p-2 space-y-2 text-white bg-secondary rounded-xl"
                >
                  <motion.div
                    initial={{
                      opacity: 0.6,
                      translateY: 8,
                      scaleX: 0.8,
                      scaleY: 0.6,
                    }}
                    animate={{
                      opacity: 1,
                      translateY: 0,
                      scaleX: 1,
                      scaleY: 1,
                    }}
                    exit={{
                      opacity: 0,
                      translateY: 8,
                      scaleX: 0.8,
                      scaleY: 0.6,
                    }}
                  >
                    <DropdownMenu.Item
                      onSelect={signOutFromApp}
                      className="px-3 py-2 cursor-pointer focus:bg-red-500 rounded-xl"
                    >
                      Sign out
                    </DropdownMenu.Item>
                  </motion.div>
                </DropdownMenu.Content>
              )}
            </AnimatePresence>
          </DropdownMenu.Root>
        ) : (
          <button
            className="px-4 py-2 flex text-white items-center bg-[#1DA1F2] rounded-xl text-sm md:text-md font-bold hover:opacity-60"
            onClick={signIn}
          >
            <TwitterLogo className="w-6 h-6 mr-1 md:mr-2" />
            Sign In with Twitter
          </button>
        )}
      </div>
    </nav>
  );
};

export default Header;
