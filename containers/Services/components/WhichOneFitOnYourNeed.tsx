import React from "react";
import { AspectRatio, Box, GridItem, Heading, SimpleGrid, Text } from "@chakra-ui/react";

import { useRouter } from "next/router";

import Image from "@/components/Image";
import { Page_Basiccourse_WhichOneFitOnYourNeed_Option1 } from "@/__generated__/graphql";

const WhichOneFitOnYourNeed = ({ data }: { data: any }) => {
  const router = useRouter();

  return (
    <SimpleGrid columns={{ base: 1, md: 2, xl: 4 }} width="full" gap={{ base: 4, md: 0 }}>
      <GridItem
        colSpan={{ base: 1, md: 2, xl: 4 }}
        placeSelf={{
          base: "center",
          md: "flex-start",
        }}
      >
        <Heading size="md" className="underline" textAlign="center" mb={8}>
          Phù hợp với giống chó nào?
        </Heading>
      </GridItem>

      {Object.values(data || {}).map((el, idx) => {
        const _el = el as any as Page_Basiccourse_WhichOneFitOnYourNeed_Option1;

        if (_el == null || _el.title == null) return null;

        return (
          <AspectRatio
            ratio={16 / 9}
            key={idx}
            borderRadius={{ base: 16, md: 0 }}
            overflow="hidden"
            _hover={{
              transform: "translateY(-4px)",
              transition: "300ms",
            }}
          >
            <Box
              position="relative"
              onClick={(e) => {
                if (_el?.link?.url == undefined) return;
                router.push(new URL(_el?.link?.url).pathname);
              }}
              cursor="pointer"
            >
              <Image
                src={_el.image?.sourceUrl || process.env.NEXT_PUBLIC_PLACEHOLDER!}
                alt={_el.image?.altText!}
              />

              <Box
                position="absolute"
                bottom={0}
                left={0}
                right={0}
                bgColor="blackAlpha.600"
                paddingY={2}
                backdropBlur="md"
              >
                <Text textAlign="center" color="white" fontWeight="bold">
                  {_el.title}
                </Text>
              </Box>
            </Box>
          </AspectRatio>
        );
      })}
    </SimpleGrid>
  );
};

export default WhichOneFitOnYourNeed;
