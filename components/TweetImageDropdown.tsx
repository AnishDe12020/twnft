import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const TweetImageDropdown = (): JSX.Element => {
  const [isOpen, setOpen] = useState<boolean>(false);

  return (
    <DropdownMenu.Root open={isOpen} onOpenChange={setOpen}>
      <DropdownMenu.Trigger className="relative z-10 px-4 py-2 text-white rounded-lg bg-gradient-to-bl from-pink-700 to-blue-700 before:absolute before:inset-0 before:bg-gradient-to-tr before:from-pink before:opacity-0 before:-z-10 before:transition before:duration-500 before:hover:opacity-100 before:rounded-lg">
        Export
      </DropdownMenu.Trigger>

      {isOpen && (
        <AnimatePresence>
          <DropdownMenu.Content
            asChild
            forceMount
            sideOffset={16}
            className="flex flex-col p-4 space-y-2 text-white bg-secondary rounded-xl"
          >
            <motion.div
              initial={{
                opacity: 0.6,
                translateY: 8,
                scaleX: 0.8,
                scaleY: 0.6,
              }}
              animate={{ opacity: 1, translateY: 0, scaleX: 1, scaleY: 1 }}
              exit={{ opacity: 0.6, translateY: 8, scaleX: 0.8, scaleY: 0.6 }}
            >
              <DropdownMenu.Item
                onSelect={() => console.log("Export as PNG")}
                className="px-3 py-2 outline-none cursor-pointer rounded-xl focus:bg-accent"
              >
                Export As PNG
              </DropdownMenu.Item>
              <DropdownMenu.Item
                onSelect={() => console.log("Export as JPEG")}
                className="px-3 py-2 outline-none cursor-pointer rounded-xl focus:bg-accent"
              >
                Export As JPEG
              </DropdownMenu.Item>
            </motion.div>
          </DropdownMenu.Content>
        </AnimatePresence>
      )}
    </DropdownMenu.Root>
  );
};

export default TweetImageDropdown;
