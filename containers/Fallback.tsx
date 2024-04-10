import React from "react";
import NextLink from "next/link";
import { Button, Flex, Heading, VStack } from "@chakra-ui/react";
import { FallbackProps } from "react-error-boundary";

const Fallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  return (
    <Flex
      padding={4}
      width="100vw"
      height="100vh"
      justifyContent="center"
      alignItems="center"
    >
      <VStack gap={4}>
        <Heading size="md" textAlign="center">
          Có lỗi xảy ra vui lòng thử lại sau!
        </Heading>
        <Button as={NextLink} href="/" variant="outline">
          Quay về trang chủ
        </Button>
      </VStack>
    </Flex>
  );
};

export default Fallback;
