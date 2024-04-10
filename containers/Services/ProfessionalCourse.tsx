import {
  Box,
  Text,
  List,
  VStack,
  Heading,
  GridItem,
  ListIcon,
  ListItem,
  Container,
  SimpleGrid,
} from "@chakra-ui/react";
import { useMemo } from "react";
import { useQuery } from "@apollo/client";
import { BiCheckCircle } from "react-icons/bi";

import {
  Get_Professional_CourseQuery,
  Professional_Course_FragmentFragment,
  Get_Professional_CourseQueryVariables,
  Page_Professionalcourse_CourseInfo_ProfessionalDog,
} from "@/__generated__/graphql";

import { COURSE_PATH } from "@/paths";
import { GET_PROFESSIONAL_COURSE } from "@/queries";

import VideoCard from "@/components/VideoCard";
import RenderHTML from "@/components/RenderHTML";
import PageSkeleton from "@/components/PageSkeleton";
import ContactButton from "@/components/ContactButton";
import WrapperMainContent from "@/components/WrapperMainContent";

import Faq from "./components/Faq";
import Trainer from "./components/Trainer";
import WhichOneFitOnYourNeed from "./components/WhichOneFitOnYourNeed";
import SEO from "@/hocs/SEO";

const ProfessionalCourse = () => {
  const { data } = useQuery<
    Get_Professional_CourseQuery,
    Get_Professional_CourseQueryVariables
  >(GET_PROFESSIONAL_COURSE, {
    variables: {
      name: COURSE_PATH.professional_course,
    },
  });

  const renderContent = useMemo(() => {
    if (data == undefined) return <PageSkeleton />;

    const { professionalCourse } = (data?.pages?.nodes[0] ||
      {}) as Professional_Course_FragmentFragment;

    const {
      faqs = {},
      trainer = {},
      courseInfo,
      description,
      descriptionAtFooter,
      whichOneFitOnYourNeed,
    } = professionalCourse || {};

    const { description: courseDescription, professionalDog } = courseInfo || {};

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
          Huấn luyện chó nghiệp vụ
        </Heading>

        {description && <RenderHTML data={description} />}

        <WhichOneFitOnYourNeed data={whichOneFitOnYourNeed} />

        <SimpleGrid gap={{ base: 4, md: 6 }} width="full">
          <Heading
            textAlign="center"
            size="md"
            className="underline"
            mb={4}
            placeSelf={{
              base: "center",
              md: "flex-start",
            }}
          >
            Thông tin khóa học huấn luyện chó cơ bản Tân Khuyển
          </Heading>

          {courseDescription && <RenderHTML data={courseDescription} />}

          <CourseCard
            data={professionalDog}
            titleForVideoSection="Video thực tế huấn luyện chó nghiệp vụ"
          />
        </SimpleGrid>

        <Trainer {...trainer} />

        <Faq
          data={faqs}
          title="Những câu hỏi thường gặp về khóa huấn luyện chó nghiệp vụ"
        />

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

export default ProfessionalCourse;

const CourseCard = ({
  data,
  titleForVideoSection,
}: {
  data: any;
  titleForVideoSection: string;
}) => {
  const { title, description, price, commands, skills, videos, trainningMethods } =
    (data || {}) as Page_Professionalcourse_CourseInfo_ProfessionalDog;

  return (
    <VStack width="full" gap={{ base: 4, md: 6 }}>
      <VStack padding={4} borderWidth={1} borderRadius={8} alignItems="flex-start">
        <Heading size="lg" alignSelf="center">
          {title}
        </Heading>
        <Text fontSize="sm">{description}</Text>
        <Text fontWeight="bold">{price}</Text>

        {commands && (
          <VStack alignItems="flex-start" gap={2} mb={4}>
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
            <Heading size="md">Kĩ năng</Heading>
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

        {trainningMethods && (
          <VStack alignItems="flex-start" gap={2} mb={4}>
            <Heading size="md">Phương pháp huấn luyện</Heading>
            <List spacing={2}>
              {trainningMethods.split(/\r?\n/).map((el, idx) => {
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

      {videos && (
        <VStack
          gap={4}
          alignItems={{
            base: "center",
            md: "flex-start",
          }}
          width="full"
        >
          <Box>
            <Heading size="md">{titleForVideoSection}</Heading>
          </Box>
          <SimpleGrid width="full" columns={{ base: 1, md: 2 }} gap={{ base: 4, md: 6 }}>
            {videos.split(/\r?\n/).map((el, idx) => {
              return <VideoCard key={idx} link={el} />;
            })}
          </SimpleGrid>
        </VStack>
      )}
    </VStack>
  );
};
