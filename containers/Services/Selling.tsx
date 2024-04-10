import { useQuery } from "@apollo/client";
import {
  List,
  Flex,
  Text,
  VStack,
  chakra,
  Heading,
  ListIcon,
  GridItem,
  ListItem,
  Container,
  SimpleGrid,
  AspectRatio,
  Button,
  Box,
  HStack,
} from "@chakra-ui/react";
import Link from "next/link";
import React, { Fragment, useMemo } from "react";
import { BiCheckCircle } from "react-icons/bi";

import {
  Get_DogsQuery,
  Get_Selling_DogQuery,
  Get_Selling_DogQueryVariables,
  Page_Sellingdog_WhyChooseUs,
  Page_Sellingdog_WhyChooseUs_Reason1,
  Post,
  Selling_Dog_FragmentFragment,
} from "@/__generated__/graphql";

import { COURSE_PATH } from "@/paths";
import Image from "@/components/Image";
import { GET_DOGS } from "@/queries/dog";
import { GET_SELLING_DOG } from "@/queries";
import RenderHTML from "@/components/RenderHTML";
import PageSkeleton from "@/components/PageSkeleton";
import WrapperMainContent from "@/components/WrapperMainContent";
import SEO from "@/hocs/SEO";

const Selling = () => {
  const { data } = useQuery<Get_Selling_DogQuery, Get_Selling_DogQueryVariables>(
    GET_SELLING_DOG,
    {
      variables: {
        name: COURSE_PATH.selling_dog,
      },
    }
  );

  const { data: dogData } = useQuery<Get_DogsQuery>(GET_DOGS);

  const renderContent = useMemo(() => {
    if (data == undefined) return <PageSkeleton />;

    const { sellingDog } = (data?.pages?.nodes[0] || {}) as Selling_Dog_FragmentFragment;

    const { description, whyChooseUs } = sellingDog || {};

    return (
      <VStack
        width="full"
        gap={8}
        alignItems={{
          md: "flex-start",
        }}
      >
        <SEO data={data?.pages?.nodes[0]} />
        <Heading
          size="lg"
          textTransform="uppercase"
          className="underline"
          textAlign="center"
          alignSelf="center"
        >
          Bán chó con
        </Heading>

        {description && <RenderHTML data={description} />}

        <WhyChooseUs data={whyChooseUs} />

        <DogList data={dogData} />
      </VStack>
    );
  }, [data, dogData]);

  return (
    <WrapperMainContent>
      <Container>{renderContent}</Container>
    </WrapperMainContent>
  );
};

const DogList = ({ data }: { data: Get_DogsQuery | undefined }) => {
  const dogs = data?.dogs?.edges || [];

  return (
    <SimpleGrid width="full" columns={{ base: 1, md: 2, lg: 3 }} gap={{ base: 4, md: 6 }}>
      <GridItem
        colSpan={{ base: 1, md: 2, lg: 3 }}
        placeSelf={{
          base: "center",
          md: "flex-start",
        }}
      >
        <Heading
          size="md"
          textTransform="uppercase"
          textAlign="center"
          className="underline"
        >
          Các giống chó
        </Heading>
      </GridItem>

      {dogs.map((el, idx) => {
        const { id, dog, slug, title } = el.node;

        const featuredImage = el.node.featuredImage as Post["featuredImage"];

        const imageSrc =
          featuredImage?.node.sourceUrl || process.env.NEXT_PUBLIC_PLACEHOLDER!;

        const altText = featuredImage?.node.altText || "";

        const { properties = "", inStock } = dog || {};

        return (
          <Link key={id} href={`${process.env.NEXT_PUBLIC_PREFIX_DOG!}/${slug}`}>
            <VStack
              width="full"
              boxShadow="lg"
              padding={4}
              borderRadius={12}
              gap={4}
              alignItems="flex-start"
              _hover={{
                transform: "translateY(calc(var(--chakra-space-4) * -1))",
                transition: "all var(--chakra-transition-duration-normal)",
              }}
            >
              <AspectRatio ratio={1} width="full" borderRadius={8} overflow="hidden">
                <Image src={imageSrc} alt={altText} />
              </AspectRatio>

              <Box alignSelf="center">
                <Heading size="md">{title}</Heading>
              </Box>

              <List spacing={2}>
                {(properties || "").split(/\r?\n/).map((el, idx) => {
                  if (!el) return null;

                  return (
                    <ListItem key={idx} display="flex" alignItems="center">
                      <ListIcon as={BiCheckCircle} color="green.500" />
                      <Text fontSize="sm">
                        {el.split(":").map((item, idx) => {
                          if (idx === 0) {
                            return (
                              <Text as="span" key={idx} fontWeight="bold">
                                {item}:
                              </Text>
                            );
                          }

                          return <Fragment key={idx}>{item}</Fragment>;
                        })}
                      </Text>
                    </ListItem>
                  );
                })}
              </List>

              <HStack width="full" justifyContent="space-between">
                <Button variant="outline">Xem chi tiết</Button>
                {inStock ? (
                  <Heading size="sm" as="span" color="primary.600">
                    Còn hàng
                  </Heading>
                ) : (
                  <Heading size="sm" color="gray.500">
                    Hết hàng
                  </Heading>
                )}
              </HStack>
            </VStack>
          </Link>
        );
      })}
    </SimpleGrid>
  );
};

const WhyChooseUs = ({ data = {} }: { data: any }) => {
  const { description } = data as Page_Sellingdog_WhyChooseUs;

  return (
    <SimpleGrid columns={{ base: 1, md: 2 }} gap={{ base: 4, md: 0 }}>
      <GridItem colSpan={{ base: 1, md: 2 }} placeSelf="center" mb={6}>
        <Heading
          size="lg"
          textTransform="uppercase"
          className="underline"
          textAlign={{
            base: "center",
            md: "unset",
          }}
        >
          Tại sao nên lựa chọn dịch vụ phối giống chó của Tân Khuyển?
        </Heading>
      </GridItem>

      {description && (
        <GridItem
          colSpan={{ base: 1, md: 2 }}
          mb={{
            md: 4,
          }}
        >
          <RenderHTML data={description} />
        </GridItem>
      )}

      {Object.values(data).map((el, idx) => {
        const _el = el as Page_Sellingdog_WhyChooseUs_Reason1;

        if (_el === null || typeof _el === "string") return null;

        return (
          <StyledItem key={idx} padding={{ base: 4, md: 6, xl: 8 }} gap={2}>
            <Heading size="sm">{_el.title}</Heading>
            {_el.description && <RenderHTML data={_el.description} />}
          </StyledItem>
        );
      })}
    </SimpleGrid>
  );
};

const StyledItem = chakra(Flex, {
  baseStyle({ theme }) {
    return {
      flexDirection: "column",

      [`@media screen and (max-width: ${theme.breakpoints.md})`]: {
        backgroundColor: "primary.50",
      },

      [`@media screen and (min-width: ${theme.breakpoints.md})`]: {
        "&:nth-of-type(4n+2), &:nth-of-type(4n+3)": {
          backgroundColor: "primary.50",
        },
      },
    };
  },
});

export default Selling;
