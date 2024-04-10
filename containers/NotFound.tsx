import NextLink from "next/link";
import { Button, Container, Flex, Heading, VStack } from "@chakra-ui/react";

const NotFound = () => {
  return (
    <Flex flexGrow={1}>
      <Container>
        <VStack
          width="full"
          height="full"
          alignItems="center"
          justifyContent="center"
          gap={4}
          paddingY={16}
        >
          <Heading
            size={{
              base: "sm",
              lg: "md",
            }}
            textAlign="center"
          >
            Trang bạn tìm kiếm không tồn tại
          </Heading>
          <Button variant="outline" as={NextLink} href="/">
            Quay lại trang chủ
          </Button>
        </VStack>
      </Container>
    </Flex>
  );
};

export default NotFound;
