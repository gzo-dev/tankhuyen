import React, { Fragment } from "react";
import { Box } from "@chakra-ui/react";

import Header from "./Header";
import Footer from "./Footer";
import ScrollToTop from "@/components/ScrollToTop";
import LoadingPage from "@/components/LoadingPage";
import FloatSupportPlatform from "@/components/FloatSupportPlatform";

interface BodyWrapperProps {
  children?: React.ReactNode;
}

const BodyWrapper = ({ children }: BodyWrapperProps) => {
  return (
    <Fragment>
      <Box display="flex" flexDirection="column" maxWidth="100vw" minHeight="100vh">
        <Header />
        <Box flexGrow={1}>{children}</Box>
        <Footer />
        <ScrollToTop />
        <FloatSupportPlatform />
      </Box>
      <LoadingPage />
    </Fragment>
  );
};

export default BodyWrapper;
