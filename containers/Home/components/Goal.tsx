import React from "react";
import RenderHTML from "@/components/RenderHTML";
import { Box, Flex, Heading, VStack, Image } from "@chakra-ui/react";

const Goal = ({ data }: { data: string }) => {
  return (
    <Flex
      paddingY={8}
      justifyContent="center"
      rowGap={8}
      position="relative"
      overflow="hidden"
    >
      <VStack color="white" maxWidth="container.md" flex={1} padding={8} rowGap={8}>
        <Heading size="lg" className="underline">
          Mục tiêu chương trình huấn luyện chó tại Tân Khuyển
        </Heading>
        <RenderHTML
          sx={{
            "ul>li::marker, ol>li::marker": {
              color: "white",
            },
          }}
          data={data}
        />
      </VStack>
      <Box zIndex={-1} position="absolute" top={0} left={0} width="full" height="full">
        <Box
          position="absolute"
          backdropBlur="sm"
          width="full"
          height="full"
          backgroundColor="black"
          opacity={0.65}
        />
        <Box
          position="absolute"
          backdropBlur="sm"
          width="full"
          height="full"
          backdropFilter="blur(4px)"
        />
        <Image
          src="/background.jpg"
          alt="Background"
          width="full"
          height="full"
          objectFit="cover"
        />
      </Box>
    </Flex>
  );
};

export default Goal;
