import { Fragment } from "react";
import { Mulish } from "next/font/google";
import { ChakraProvider as RootChakraProvider } from "@chakra-ui/react";

import { theme } from "./theme";

const mulish = Mulish({ subsets: ["latin"] });

const ChakraProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <Fragment>
      <style jsx global>
        {`
          :root {
            --font-serif: ${mulish.style.fontFamily};
          }
          html {
            scroll-behavior: smooth;
          }

          .grecaptcha-badge {
            visibility: hidden !important;
          }
        `}
      </style>
      <RootChakraProvider theme={theme} resetCSS>
        {children}
      </RootChakraProvider>
    </Fragment>
  );
};

export default ChakraProvider;
