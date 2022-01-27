import { uploadToIPFS } from "@3rdweb/sdk";
import FileOrBuffer from "@3rdweb/sdk/dist/types/FileOrBuffer";
import * as Dialog from "@radix-ui/react-dialog";
import { ref } from "firebase/storage";
import { ErrorMessage, Field, Form, Formik } from "formik";
import { AnimatePresence, motion } from "framer-motion";
import html2canvas from "html2canvas";
import { useState } from "react";
import useTweetUrl from "../hooks/useTweetContext";
import useUser from "../hooks/useUser";
import * as Yup from "yup";
import { Spinner } from "./Icons";

const MintNFTSchema = Yup.object().shape({
  name: Yup.string().required("Required!"),
});

const MintNFTModal = () => {
  const [isOpen, toggleOpen] = useState<boolean>(false);
  const [isSubmitting, setSubmitting] = useState<boolean>(false);
  const [errorMessage, setError] = useState<string>();
  const { user } = useUser();
  const { tweetUrl, tweetData, tweetRef } = useTweetUrl();

  const mintNFT = async (
    name: string,
    setSubmitting: (isSubmitting: boolean) => void,
    description?: string
  ) => {
    html2canvas(tweetRef?.current as HTMLDivElement, {
      backgroundColor: null,
      useCORS: true,
      scrollY: -window.scrollY,
    }).then(async canvas => {
      canvas.style.display = "none";
      canvas.toBlob(async blob => {
        // const nftRef = ref(storage);
        uploadToIPFS(blob as FileOrBuffer).then(async hash => {
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
            setError("Tweet has been already minted");
            console.log("Tweet has been already minted");
            setSubmitting(false);
          } else if (error === "notTweetOwner") {
            setError("You can only mint tweets that you own");
            console.log("You can only mint tweets that you own");
            setSubmitting(false);
          } else {
            console.log(data);
            setSubmitting(false);
          }
        });
      });
    });
  };

  return (
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
                    onSubmit={async values => {
                      setSubmitting(true);
                      await mintNFT(
                        values.name,
                        setSubmitting,
                        values.description
                      );
                    }}
                    validationSchema={MintNFTSchema}
                  >
                    {({ errors }) => {
                      console.log("s", isSubmitting);
                      return (
                        <Form className="mx-4">
                          <div className="mt-6">
                            <label
                              className="text-lg font-semibold text-white"
                              htmlFor="name"
                            >
                              NFT Name
                            </label>
                            <Field
                              className="w-64 mt-4 border-2 rounded-xl border-secondary hover:border-opacity-60"
                              type="text"
                              name="name"
                              id="name"
                            />

                            {errors.name && (
                              <p className="px-3 py-2 mt-4 text-center text-white bg-red-500 w-fit rounded-xl text-md">
                                {errors.name}
                              </p>
                            )}
                          </div>
                          <div className="mt-6">
                            <label
                              className="text-lg font-semibold text-white"
                              htmlFor="description"
                            >
                              NFT Description
                              <p className="mt-2 text-sm font-normal text-gray-300">
                                Tweet Content will be used if left blank
                              </p>
                            </label>
                            <Field
                              as="textarea"
                              className="mt-4 border-2 rounded-xl border-secondary"
                              type="text"
                              name="description"
                              id="description"
                            />
                          </div>
                          <button
                            type="submit"
                            className="relative z-10 px-4 py-2 mt-4 text-center text-white rounded-lg w-fit bg-gradient-to-tr from-pink-700 to-blue-700 before:absolute before:inset-0 before:bg-gradient-to-bl before:from-pink before:opacity-0 before:-z-10 before:transition before:duration-500 before:hover:opacity-100 before:rounded-lg"
                          >
                            {isSubmitting ? (
                              <Spinner className="text-white" />
                            ) : (
                              <span>Submit</span>
                            )}
                          </button>
                        </Form>
                      );
                    }}
                  </Formik>
                  {errorMessage && (
                    <p className="px-3 py-2 mx-4 mt-4 text-center text-white bg-red-500 rounded-xl text-md w-fit">
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
  );
};

export default MintNFTModal;
