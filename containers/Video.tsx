import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import React, { Fragment, MouseEvent, useCallback, useMemo } from "react";
import {
  Box,
  VStack,
  Button,
  Heading,
  GridItem,
  Container,
  SimpleGrid,
} from "@chakra-ui/react";

import { GET_METADATA_VIDEO, GET_VIDEOS } from "@/queries";
import { Get_VideosQuery, Get_Metata_VideoQuery } from "@/__generated__/graphql";

import SEO from "@/hocs/SEO";
import VideoCard from "@/components/VideoCard";
import RenderHTML from "@/components/RenderHTML";
import PageSkeleton from "@/components/PageSkeleton";
import WrapperMainContent from "@/components/WrapperMainContent";

const Video = () => {
  const router = useRouter();
  const { data } = useQuery<Get_VideosQuery>(GET_VIDEOS);
  const { data: metadata } = useQuery<Get_Metata_VideoQuery>(GET_METADATA_VIDEO);

  const onGotoHandler = useCallback(
    (e: MouseEvent<HTMLButtonElement>) => {
      const path = e.currentTarget.dataset.path as string | undefined;

      if (path == undefined) return;

      router.push(path);
    },
    [router]
  );

  const renderContent = useMemo(() => {
    if (data == undefined || metadata == undefined) return <PageSkeleton />;

    const { content, metadataForVideo } = metadata?.pages?.nodes[0] || {};

    const {
      daily_activity,
      training_big_dog,
      training_small_dog,
      training_advance_big_dog,
      insemination,
    } = data || {};

    const { basicCourseForBigDog, basicCourseForSmallDog, professionalCourse } =
      metadataForVideo ?? {};

    const basicCourseForSmallDogUrl = basicCourseForSmallDog?.uri || null;
    const basicCourseForBigDogUrl = basicCourseForBigDog?.uri || null;
    const professionalCourseUrl = professionalCourse?.uri || null;

    return (
      <VStack width="full" gap={{ base: 8 }}>
        <SEO data={metadata?.pages?.nodes[0]} />
        <Heading className="underline" marginBottom={4}>
          Video thực tế
        </Heading>

        {content && (
          <Box width="full">
            <RenderHTML data={content} />
          </Box>
        )}

        <VStack
          alignItems={{
            base: "center",
            md: "flex-start",
          }}
          gap={8}
          width="full"
        >
          <Heading className="underline" size="md">
            Lớp học huấn luyện chó cơ bản
          </Heading>

          <SimpleGrid
            columns={{ base: 1, md: 2, xl: 3 }}
            gap={{ base: 4, xl: 6 }}
            width="full"
          >
            <GridItem colSpan={{ base: 1, md: 2, xl: 3 }}>
              <Heading size="sm">Chó nhỏ</Heading>
            </GridItem>

            {training_small_dog?.edges.slice(0, 9).map((el, idx) => {
              return <VideoCard key={idx} link={el.node.video?.link!} />;
            })}

            {basicCourseForSmallDogUrl && (
              <GridItem colSpan={{ base: 1, md: 2, xl: 3 }} justifySelf="center">
                <Button onClick={onGotoHandler} data-path={basicCourseForSmallDogUrl}>
                  Thông tin khóa học
                </Button>
              </GridItem>
            )}
          </SimpleGrid>

          <SimpleGrid
            columns={{ base: 1, md: 2, xl: 3 }}
            gap={{ base: 4, xl: 6 }}
            width="full"
          >
            <GridItem colSpan={{ base: 1, md: 2, xl: 3 }}>
              <Heading size="sm">Chó lớn</Heading>
            </GridItem>

            {training_big_dog?.edges.slice(0, 9).map((el, idx) => {
              return <VideoCard key={idx} link={el.node.video?.link!} />;
            })}

            {basicCourseForBigDogUrl && (
              <GridItem colSpan={{ base: 1, md: 2, xl: 3 }} justifySelf="center">
                <Button onClick={onGotoHandler} data-path={basicCourseForBigDogUrl}>
                  Thông tin khóa học
                </Button>
              </GridItem>
            )}
          </SimpleGrid>
        </VStack>

        <SimpleGrid
          columns={{ base: 1, md: 2, xl: 3 }}
          gap={{ base: 4, xl: 6 }}
          width="full"
        >
          <GridItem
            colSpan={{ base: 1, md: 2, xl: 3 }}
            justifySelf={{
              base: "center",
              md: "flex-start",
            }}
          >
            <Heading className="underline" size="md" marginBottom={4}>
              Lớp học huấn luyện chó nghiệp vụ
            </Heading>
          </GridItem>

          {training_advance_big_dog?.edges.slice(0, 9).map((el, idx) => {
            return <VideoCard key={idx} link={el.node.video?.link!} />;
          })}

          {professionalCourseUrl && (
            <GridItem colSpan={{ base: 1, md: 2, xl: 3 }} justifySelf="center">
              <Button onClick={onGotoHandler} data-path={professionalCourseUrl}>
                Thông tin khóa học
              </Button>
            </GridItem>
          )}
        </SimpleGrid>

        <SimpleGrid
          columns={{ base: 1, md: 2, xl: 3 }}
          gap={{ base: 4, xl: 6 }}
          width="full"
        >
          <GridItem
            colSpan={{ base: 1, md: 2, xl: 3 }}
            justifySelf={{
              base: "center",
              md: "flex-start",
            }}
          >
            <Heading className="underline" size="md" marginBottom={4}>
              Sinh hoạt của chó
            </Heading>
          </GridItem>

          {daily_activity?.edges.slice(0, 9).map((el, idx) => {
            return <VideoCard key={idx} link={el.node.video?.link!} />;
          })}
        </SimpleGrid>

        <SimpleGrid
          columns={{ base: 1, md: 2, xl: 3 }}
          gap={{ base: 4, xl: 6 }}
          width="full"
        >
          <GridItem
            colSpan={{ base: 1, md: 2, xl: 3 }}
            justifySelf={{
              base: "center",
              md: "flex-start",
            }}
          >
            <Heading className="underline" size="md" marginBottom={4}>
              Phối giống
            </Heading>
          </GridItem>

          {insemination?.edges.slice(0, 9).map((el, idx) => {
            return <VideoCard key={idx} link={el.node.video?.link!} />;
          })}
        </SimpleGrid>
      </VStack>
    );
  }, [data, metadata, onGotoHandler]);

  return (
    <Fragment>
      <SEO data={metadata?.pages?.nodes[0]} />
      <WrapperMainContent>
        <Container>{renderContent}</Container>
      </WrapperMainContent>
    </Fragment>
  );
};

export default Video;
