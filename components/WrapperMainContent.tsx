import React from "react";
import { Flex, FlexProps } from "@chakra-ui/react";

const WrapperMainContent = (props: FlexProps) => {
  return <Flex paddingY={{ base: 8, lg: 16 }} {...props} />;
};

export default WrapperMainContent;
