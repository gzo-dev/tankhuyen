import React from "react";
import { Box, Heading, SimpleGrid, Text, VStack } from "@chakra-ui/react";

import {
  Page_Homepage_Services,
  Page_Homepage_Services_Service1,
} from "@/__generated__/graphql";
import Image from "@/components/Image";
import Link from "next/link";

const Services = ({ data }: { data: Page_Homepage_Services }) => {
  const results = Object.values(data).filter((el) => {
    if (typeof el === "string") return false;
    if (el?.title == null) return false;
    return true;
  }) as Page_Homepage_Services_Service1[];

  return (
    <VStack paddingY={16} justifyContent="center" rowGap={16}>
      <Heading textAlign="center" className="underline">
        Dịch vụ của chúng tôi
      </Heading>

      <SimpleGrid width="100%" columns={[1, null, 2, 3]} gap={{ base: 4, lg: 8 }}>
        {results.map((el, idx) => {
          return (
            <Box
              boxShadow="md"
              padding={4}
              borderRadius={12}
              _hover={{
                transform: "translateY(-4px)",
                transition: "300ms",
              }}
              key={idx}
            >
              <Link href={el?.link?.uri || "#"}>
                <VStack rowGap={4} alignItems="flex-start">
                  {el.image && (
                    <Box width="full" borderRadius={8} overflow="hidden">
                      <Image
                        src={el.image.sourceUrl!}
                        alt={el.image.altText!}
                        aspectRatio={2 / 1}
                      />
                    </Box>
                  )}

                  <Heading size="md">{el.title}</Heading>
                  <Text>{el.description}</Text>
                </VStack>
              </Link>
            </Box>
          );
        })}
      </SimpleGrid>
    </VStack>
  );
};

export default Services;
