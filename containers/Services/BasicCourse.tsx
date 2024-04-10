import { Fragment, useMemo } from "react";
import { useQuery } from "@apollo/client";
import { BiCheckCircle } from "react-icons/bi";

import {
  Box,
  List,
  Text,
  VStack,
  Heading,
  GridItem,
  ListItem,
  ListIcon,
  Container,
  SimpleGrid,
} from "@chakra-ui/react";

import { COURSE_PATH } from "@/paths";
import { GET_BASIC_COURSE } from "@/queries";
import {
  Get_Basic_CourseQuery,
  Basic_Course_FragmentFragment,
  Get_Basic_CourseQueryVariables,
  Page_Basiccourse_CourseInfo_BigDog,
} from "@/__generated__/graphql";

import VideoCard from "@/components/VideoCard";
import RenderHTML from "@/components/RenderHTML";
import PageSkeleton from "@/components/PageSkeleton";
import ContactButton from "@/components/ContactButton";
import WrapperMainContent from "@/components/WrapperMainContent";

import Faq from "./components/Faq";
import Trainer from "./components/Trainer";
import WhichOneFitOnYourNeed from "./components/WhichOneFitOnYourNeed";
import SEO from "@/hocs/SEO";

const BasicCourse = () => {
  const { data } = useQuery<Get_Basic_CourseQuery, Get_Basic_CourseQueryVariables>(
    GET_BASIC_COURSE,
    {
      variables: {
        name: COURSE_PATH.basic_course,
      },
    }
  );

  const renderContent = useMemo(() => {
    if (data == undefined) {
      return <PageSkeleton />;
    }

    const { basicCourse } = (data?.pages?.nodes[0] ||
      {}) as Basic_Course_FragmentFragment;

    const {
      faqs = {},
      trainer = {},
      courseInfo,
      description,
      descriptionAtFooter,
      whichOneFitOnYourNeed,
    } = basicCourse || {};

    const { description: courseDescription, bigDog, smallDog } = courseInfo || {};

    return (
      <VStack
        width="full"
        gap={8}
        alignItems={{
          md: "flex-start",
        }}
      >
        <SEO data={data?.pages?.nodes[0] as any} />

        <Heading
          size="lg"
          textTransform="uppercase"
          className="underline"
          textAlign="center"
          alignSelf="center"
        >
          Huấn luyện chó cơ bản
        </Heading>

        {description && <RenderHTML data={description} />}

        <WhichOneFitOnYourNeed data={whichOneFitOnYourNeed} />

        <SimpleGrid columns={{ base: 1, md: 4 }} gap={{ base: 4, md: 6 }} width="full">
          <GridItem
            colSpan={{ base: 1, md: 4 }}
            placeSelf={{
              base: "center",
              md: "flex-start",
            }}
          >
            <Heading textAlign="center" size="md" className="underline" mb={4}>
              Thông tin khóa học huấn luyện chó cơ bản Tân Khuyển
            </Heading>
          </GridItem>

          {courseDescription && (
            <GridItem colSpan={{ base: 1, md: 4 }}>
              <RenderHTML data={courseDescription} />
            </GridItem>
          )}

          <GridItem
            gridColumn={{
              base: 1,
              md: "2 / span 2",
            }}
          >
            <CourseCard data={smallDog} />
          </GridItem>

          <VideoSection
            data={smallDog}
            titleForVideoSection="Video thực tế huấn luyện cơ bản chó nhỏ"
          />

          <GridItem
            gridColumn={{
              base: 1,
              md: "2 / span 2",
            }}
          >
            <CourseCard data={bigDog} />
          </GridItem>

          <VideoSection
            data={bigDog}
            titleForVideoSection="Video thực tế huấn luyện cơ bản chó lớn"
          />
        </SimpleGrid>

        <Trainer {...trainer} />

        <Faq data={faqs} title="Những câu hỏi thường gặp về khóa huấn luyện chó cơ bản" />

        {descriptionAtFooter && (
          <VStack gap={4} width="full">
            <Box width="full" maxWidth="container.md" textAlign="center">
              <RenderHTML data={descriptionAtFooter} />
            </Box>
            <ContactButton />
          </VStack>
        )}
      </VStack>
    );
  }, [data]);

  return (
    <WrapperMainContent>
      <Container>{renderContent}</Container>
    </WrapperMainContent>
  );
};

export default BasicCourse;

const CourseCard = ({ data }: { data: any }) => {
  const { title, description, price, commands, skills, specialSkills, additionalSkills } =
    (data || {}) as Page_Basiccourse_CourseInfo_BigDog;

  return (
    <VStack
      width="full"
      borderWidth={1}
      padding={4}
      borderRadius={16}
      alignItems="flex-start"
    >
      <Heading size="lg" alignSelf="center">
        {title}
      </Heading>
      <Text fontSize="sm">{description}</Text>
      <Text fontWeight="bold">{price}</Text>

      {commands && (
        <VStack alignItems="flex-start" gap={2} mb={6}>
          <Heading size="md">Các lệnh</Heading>
          <List spacing={2}>
            {commands.split(/\r?\n/).map((el, idx) => {
              if (!el) return null;

              return (
                <ListItem key={idx} display="flex" alignItems="center">
                  <ListIcon as={BiCheckCircle} color="green.500" />
                  {el}
                </ListItem>
              );
            })}
          </List>
        </VStack>
      )}

      {skills && (
        <VStack alignItems="flex-start" gap={2} mb={4}>
          <Heading size="md">Kĩ năng cơ bản</Heading>
          <List spacing={2}>
            {skills.split(/\r?\n/).map((el, idx) => {
              if (!el) return null;

              return (
                <ListItem key={idx} display="flex" alignItems="center">
                  <ListIcon as={BiCheckCircle} color="green.500" />
                  {el}
                </ListItem>
              );
            })}
          </List>
        </VStack>
      )}

      {specialSkills && (
        <VStack alignItems="flex-start" gap={2} mb={4}>
          <Heading size="md">Kĩ năng đặc biệt</Heading>
          <List spacing={2}>
            {specialSkills.split(/\r?\n/).map((el, idx) => {
              if (!el) return null;

              return (
                <ListItem key={idx} display="flex" alignItems="center">
                  <ListIcon as={BiCheckCircle} color="green.500" />
                  {el}
                </ListItem>
              );
            })}
          </List>
        </VStack>
      )}

      {additionalSkills && (
        <VStack alignItems="flex-start" gap={2} mb={4}>
          <Heading size="md">Kĩ năng bổ sung</Heading>
          <List spacing={2}>
            {additionalSkills.split(/\r?\n/).map((el, idx) => {
              if (!el) return null;

              return (
                <ListItem key={idx} display="flex" alignItems="center">
                  <ListIcon as={BiCheckCircle} color="green.500" />
                  {el}
                </ListItem>
              );
            })}
          </List>
        </VStack>
      )}
      <ContactButton />
    </VStack>
  );
};

const VideoSection = ({
  data,
  titleForVideoSection,
}: {
  data: any;
  titleForVideoSection: string;
}) => {
  const { videos } = (data || {}) as Page_Basiccourse_CourseInfo_BigDog;

  return videos ? (
    <Fragment>
      <GridItem gridColumn={{ base: 1, md: "span 4" }}>
        <Heading
          size="md"
          textAlign={{
            base: "center",
            md: "left",
          }}
        >
          {titleForVideoSection}
        </Heading>
      </GridItem>

      {videos.split(/\r?\n/).map((el, idx) => {
        return (
          <GridItem
            gridColumn={{
              base: 1,
              md: "span 2",
            }}
            key={idx}
          >
            <VideoCard key={idx} link={el} />
          </GridItem>
        );
      })}
    </Fragment>
  ) : null;
};
