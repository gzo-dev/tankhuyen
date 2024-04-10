import {
  Page_Homepage_Whychooseus,
  Page_Homepage_Whychooseus_Reason1,
} from "@/__generated__/graphql";
import { Box, Heading, SimpleGrid, Text, VStack, chakra } from "@chakra-ui/react";
import React from "react";

const WhyChooseUs = ({ data }: { data: Page_Homepage_Whychooseus }) => {
  const results = Object.values(data).filter((el) => {
    if (typeof el === "string") return false;
    if (el?.title == null) return false;
    return true;
  }) as Page_Homepage_Whychooseus_Reason1[];

  return (
    <VStack paddingY={16} justifyContent="center" rowGap={16}>
      <Heading textAlign="center" className="underline">
        Tại sao nên chọn Tân Khuyển
      </Heading>

      <SimpleGrid columns={{ base: 1, md: 2 }}>
        {results.map((el, idx) => {
          return (
            <StyledBox key={idx} padding={8}>
              <VStack alignItems="flex-start" gap={6}>
                <Heading size="md">{el.title}</Heading>
                <Text>{el.description}</Text>
              </VStack>
            </StyledBox>
          );
        })}
      </SimpleGrid>
    </VStack>
  );
};

const StyledBox = chakra(Box, {
  baseStyle({ theme }) {
    return {
      [`@media screen and (max-width: ${theme.breakpoints.md})`]: {
        "&:nth-of-type(2n+1)": {
          backgroundColor: "primary.50",
        },
      },

      [`@media screen and (min-width: ${theme.breakpoints.md})`]: {
        "&:nth-of-type(4n+2), &:nth-of-type(4n+3)": {
          backgroundColor: "primary.50",
        },
      },
    };
  },
});

export default WhyChooseUs;
