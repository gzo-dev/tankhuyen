import { Fragment, useMemo } from "react";
import { useQuery } from "@apollo/client";
import {
  Box,
  Step,
  VStack,
  Heading,
  Stepper,
  GridItem,
  StepIcon,
  Container,
  SimpleGrid,
  StepNumber,
  StepStatus,
  StepSeparator,
  StepIndicator,
} from "@chakra-ui/react";

import {
  Get_InseminationQuery,
  Page_Insemination_Procedure,
  Insemination_FragmentFragment,
  Get_InseminationQueryVariables,
  Page_Insemination_Procedure_Step1,
} from "@/__generated__/graphql";

import { COURSE_PATH } from "@/paths";
import { GET_INSEMINATION } from "@/queries";
import RenderHTML from "@/components/RenderHTML";
import PageSkeleton from "@/components/PageSkeleton";
import ContactButton from "@/components/ContactButton";
import WrapperMainContent from "@/components/WrapperMainContent";

import Faq from "./components/Faq";
import SEO from "@/hocs/SEO";
import VideoCard from "@/components/VideoCard";

const Insemination = () => {
  const { data } = useQuery<Get_InseminationQuery, Get_InseminationQueryVariables>(
    GET_INSEMINATION,
    {
      variables: {
        name: COURSE_PATH.insemination,
      },
    }
  );

  const renderContent = useMemo(() => {
    if (data == undefined) return <PageSkeleton />;

    const { insemination } = (data?.pages?.nodes[0] ||
      {}) as Insemination_FragmentFragment;

    const {
      faqs = {},
      description,
      procedure,
      descriptionAtFooter,
      whyChooseUs,
      videos,
    } = insemination || {};

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
          Phối Giống
        </Heading>

        {description && <RenderHTML data={description} />}

        {whyChooseUs && (
          <VStack>
            <Heading
              size="md"
              textTransform="uppercase"
              textAlign="center"
              className="underline"
              mb={{ base: 4, md: 8 }}
              placeSelf={{
                base: "center",
                md: "flex-start",
              }}
            >
              Tại sao nên lựa chọn dịch vụ phối giống chó của Tân Khuyển?
            </Heading>
            <RenderHTML data={whyChooseUs} />
          </VStack>
        )}

        <Procedure data={procedure} />

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
              <Heading size="md">Video phối giống thực tế</Heading>
            </Box>
            <SimpleGrid
              width="full"
              columns={{ base: 1, md: 2 }}
              gap={{ base: 4, md: 6 }}
            >
              {videos.split(/\r?\n/).map((el, idx) => {
                return <VideoCard key={idx} link={el} />;
              })}
            </SimpleGrid>
          </VStack>
        )}

        <Faq data={faqs} title="Những câu hỏi thường gặp về dịch vụ phối giống chó" />

        {descriptionAtFooter && (
          <VStack gap={4} width="full">
            <Box width="full" maxWidth="container.md" textAlign="center">
              <RenderHTML data={descriptionAtFooter} />
            </Box>
            <ContactButton>Liên hệ ngay</ContactButton>
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

const Procedure = ({ data }: { data: any }) => {
  const _data = (data || {}) as Page_Insemination_Procedure;

  return (
    <Fragment>
      <SimpleGrid gap={{ base: 4, md: 6 }}>
        <GridItem
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
            Quy trình phối giống chó tại Tân Khuyển như thế nào?
          </Heading>
        </GridItem>

        <GridItem>
          <VStack
            alignItems={{
              md: "flex-start",
            }}
            gap={4}
          >
            <Heading size="md">Dành cho chó khoẻ và bình thường</Heading>

            <Stepper orientation="vertical" index={-1} gap={0}>
              {Object.values(_data).map((el, idx) => {
                const _el = el as Page_Insemination_Procedure_Step1;

                if (_el === null || typeof _el === "string" || _el.title == null)
                  return null;

                return (
                  <Step key={idx}>
                    <StepIndicator>
                      <StepStatus
                        complete={<StepIcon />}
                        incomplete={<StepNumber />}
                        active={<StepNumber />}
                      />
                    </StepIndicator>

                    <VStack key={idx} gap={2} alignItems="flex-start" ml={2} mb={4}>
                      <Heading size="sm">{_el.title}</Heading>
                      {_el.description && <RenderHTML data={_el.description} />}
                    </VStack>

                    <StepSeparator />
                  </Step>
                );
              })}
            </Stepper>
          </VStack>
        </GridItem>
      </SimpleGrid>
    </Fragment>
  );
};

export default Insemination;
