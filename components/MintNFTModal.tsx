import { uploadToIPFS } from "@3rdweb/sdk";
import * as Dialog from "@radix-ui/react-dialog";
import { ref } from "firebase/storage";
import { Field, Form, Formik } from "formik";
import { AnimatePresence, motion } from "framer-motion";
import html2canvas from "html2canvas";
import { useState } from "react";
import useTweetUrl from "../hooks/useTweetContext";
import useUser from "../hooks/useUser";

const MintNFTModal = () => {
  const [isOpen, toggleOpen] = useState<boolean>(false);
  const [errorMessage, setError] = useState<string>();
  const { user } = useUser();
  const { tweetUrl, tweetData, tweetRef } = useTweetUrl();

  const mintNFT = async (name: string, description?: string) => {
    const canvas = html2canvas(tweetRef?.current as HTMLDivElement, {
      backgroundColor: null,
      useCORS: true,
      scrollY: -window.scrollY,
    }).then(canvas => {
      canvas.style.display = "none";
      canvas.toBlob(blob => {
        // const nftRef = ref(storage);
        uploadToIPFS(blob).then(async hash => {
          const ipfsHash = hash;
          console.log(ipfsHash);
          const res = await fetch(
            `/api/generate-signature?tweetUrl=${tweetUrl}`,
            {
              headers: {
                authorization: await user?.getIdToken(),
              } as HeadersInit,
              method: "POST",
              body: JSON.stringify({
                tweetUrl: tweetUrl,
                tweetData: tweetData,
                ipfsHash: ipfsHash,
                name: name,
                description: description,
              }),
            }
          );

          const { error, data } = await res.json();
          if (error === "tweetMinted") {
            setError("Tweet has already minted");
            console.log("Tweet has already minted");
          } else if (error === "notTweetOwner") {
            setError("You can only mint tweets that you own");
            console.log("You can only mint tweets that you own");
          } else {
            console.log(data);
          }
        });
      });
    });
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
                    <Formik
                      initialValues={{ name: "", description: "" }}
                      onSubmit={async (values, { setSubmitting }) => {
                        await mintNFT(values.name, values.description);
                        setSubmitting(false);
                      }}
                    >
                      {({ isSubmitting }) => (
                        <Form>
                          <div>
                            <label htmlFor="name">NFT Name</label>
                            <Field type="text" name="name" id="name" />
                          </div>
                          <div>
                            <label htmlFor="description">NFT Description</label>
                            <p>Tweet Content will be used if left blank</p>
                            <Field
                              type="text"
                              name="description"
                              id="description"
                            />
                          </div>
                          <button type="submit" className="text-white">
                            Mint NFT
                          </button>
                        </Form>
                      )}
                    </Formik>
                    {errorMessage && (
                      <p className="mt-4 text-red-500 text-md">
                        {errorMessage}
                      </p>
                    )}
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
