import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import React, { Fragment, useEffect, useState } from "react";

import "swiper/css";
import "swiper/css/navigation";

import {
  Text,
  List,
  VStack,
  Heading,
  ListIcon,
  Skeleton,
  ListItem,
  Container,
  AspectRatio,
  SkeletonText,
  Box,
  SimpleGrid,
  chakra,
} from "@chakra-ui/react";
import { BiCheckCircle } from "react-icons/bi";

import {
  Fragment_Media_ItemFragment,
  Get_Detail_DogQuery,
  Get_Detail_DogQueryVariables,
  NodeWithFeaturedImageToMediaItemConnectionEdge,
} from "@/__generated__/graphql";

import SEO from "@/hocs/SEO";

import Image from "@/components/Image";
import { GET_DETAIL_DOG } from "@/queries/dog";
import RenderHTML from "@/components/RenderHTML";
import WrapperMainContent from "@/components/WrapperMainContent";

import ContactForBuyingDog from "./ContactForBuyingDog";
import VideoCard from "@/components/VideoCard";

const DogDetail = () => {
  const router = useRouter();

  const { data } = useQuery<Get_Detail_DogQuery, Get_Detail_DogQueryVariables>(
    GET_DETAIL_DOG,
    {
      variables: {
        search: router.query.slug
          ? (router.query.slug as string).replaceAll(/-/g, " ")
          : "",
      },
    }
  );

  const [isLoading, setIsLoading] = useState(!data);

  useEffect(() => {
    const node = data?.dogs?.edges?.[0];

    if (data) setIsLoading(false);

    if (data == undefined || node) return;
  }, [data, router]);

  const node = data?.dogs?.edges?.[0]?.node;

  const { dog, title } = node || {};
  const featuredImage =
    node?.featuredImage as NodeWithFeaturedImageToMediaItemConnectionEdge;

  const { description, properties = "", policies, video, sliders = {} } = dog || {};

  const results = Object.values(sliders as any).filter((el) => {
    return el !== null && typeof el !== "string";
  }) as Fragment_Media_ItemFragment[];

  return (
    <WrapperMainContent>
      <SEO data={node as any} />
      <Container maxWidth="container.lg">
        <VStack gap={8} alignItems="flex-start">
          <Skeleton isLoaded={!isLoading} width="full">
            <Heading size="xl">{title}</Heading>
          </Skeleton>

          <SimpleGrid
            width="full"
            gridTemplateColumns={{
              base: "repeat(1fr, 2)",
              md: "60% 40%",
            }}
            gap={4}
          >
            <Skeleton isLoaded={!isLoading} width="full">
              <AspectRatio ratio={16 / 9} width="full">
                {video ? (
                  <VideoCard link={video} />
                ) : (
                  <Image
                    src={
                      featuredImage?.node.sourceUrl ||
                      process.env.NEXT_PUBLIC_PLACEHOLDER!
                    }
                    alt={featuredImage?.node.altText || ""}
                  />
                )}
              </AspectRatio>
            </Skeleton>

            <Box width="full">
              {policies && (
                <VStack spacing={4} alignItems="flex-start">
                  <Heading size="md">Chính sách bảo hành:</Heading>

                  <List spacing={4}>
                    {policies.split(/\r?\n/).map((el, idx) => {
                      if (!el) return null;

                      return (
                        <ListItem key={idx} display="flex" alignItems="center">
                          <ListIcon as={BiCheckCircle} color="green.500" />
                          <Text>
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
                </VStack>
              )}
            </Box>
          </SimpleGrid>

          <Box width="full">
            <StyledSwiper
              modules={[Navigation, Autoplay]}
              spaceBetween={24}
              slidesPerView={1}
              breakpoints={{
                480: {
                  slidesPerView: 2,
                },
                768: {
                  slidesPerView: 3,
                },
              }}
              navigation
              loop
              autoplay={{ delay: 3000, pauseOnMouseEnter: true }}
            >
              {results.map((el) => {
                return (
                  <SwiperSlide key={el.sourceUrl!}>
                    <Box aspectRatio={16 / 9}>
                      <Image src={el.sourceUrl!} alt={el.altText!} aspectRatio={16 / 9} />
                    </Box>
                  </SwiperSlide>
                );
              })}
            </StyledSwiper>
          </Box>

          {properties && (
            <Fragment>
              <Heading size="md">Đặc tính:</Heading>

              <List spacing={4}>
                {properties.split(/\r?\n/).map((el, idx) => {
                  if (!el) return null;

                  return (
                    <ListItem key={idx} display="flex" alignItems="center">
                      <ListIcon as={BiCheckCircle} color="green.500" />
                      <Text>
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
            </Fragment>
          )}

          {description && (
            <SkeletonText
              isLoaded={!isLoading}
              noOfLines={15}
              skeletonHeight={2}
              spacing={4}
            >
              <RenderHTML data={description} />
            </SkeletonText>
          )}

          <Skeleton isLoaded={!isLoading} width="full">
            <Box
              maxWidth={{
                md: "75%",
              }}
              marginX="auto"
            >
              <ContactForBuyingDog name={title || ""} />
            </Box>
          </Skeleton>
        </VStack>
      </Container>
    </WrapperMainContent>
  );
};

const StyledSwiper = chakra(Swiper, {
  baseStyle({ theme }) {
    return {
      ["& .swiper-button-prev, & .swiper-button-next"]: {
        color: theme.colors.primary[600],
        opacity: 0,
      },

      "&:hover .swiper-button-prev, &:hover .swiper-button-next": {
        opacity: 1,
        transition: "200ms",
      },
    };
  },
});

export default DogDetail;
