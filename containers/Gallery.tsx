import React, { Fragment } from "react";
import { useQuery } from "@apollo/client";
import { Box, VStack, Heading, GridItem, Container, SimpleGrid } from "@chakra-ui/react";

import Zoom from "react-medium-image-zoom";

import { get } from "lodash";

import { GET_GALLERY } from "@/queries";
import {
  Get_GalleryQuery,
  Get_GalleryQueryVariables,
  Fragment_Page_TypeFragment,
} from "@/__generated__/graphql";

import SEO from "@/hocs/SEO";
import WrapperMainContent from "@/components/WrapperMainContent";
import { COURSE_PATH } from "@/paths";
import Image from "@/components/Image";

import "react-medium-image-zoom/dist/styles.css";

const Gallery = () => {
  const { data } = useQuery<Get_GalleryQuery, Get_GalleryQueryVariables>(GET_GALLERY, {
    variables: {
      name: COURSE_PATH.gallery,
    },
  });

  const seoContent = get(data, "pages.nodes[0]") as
    | Fragment_Page_TypeFragment
    | undefined;

  const imageList = get(data, "pages.nodes[0].gallery.images", "").split("\n");

  return (
    <Fragment>
      <SEO data={seoContent} />
      <WrapperMainContent>
        <Container>
          <VStack
            alignItems={{
              base: "center",
              md: "flex-start",
            }}
            gap={8}
            width="full"
          >
            <Heading
              size="lg"
              textTransform="uppercase"
              className="underline"
              textAlign="center"
              alignSelf="center"
            >
              Hình ảnh thực tế
            </Heading>

            <SimpleGrid
              columns={{ base: 1, md: 2, xl: 3 }}
              gap={{ base: 4, xl: 6 }}
              width="full"
            >
              {imageList.map((el, idx) => {
                return (
                  <GridItem key={idx} justifySelf="center" width="full">
                    <Zoom zoomMargin={24}>
                      <Box aspectRatio={16 / 9}>
                        <Image src={el} alt={""} aspectRatio={16 / 9} />
                      </Box>
                    </Zoom>
                  </GridItem>
                );
              })}
            </SimpleGrid>
          </VStack>
        </Container>
      </WrapperMainContent>
    </Fragment>
  );
};

export default Gallery;
