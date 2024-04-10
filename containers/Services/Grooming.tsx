import {
  Box,
  Container,
  GridItem,
  Heading,
  SimpleGrid,
  VStack,
  Step,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  Stepper,
  chakra,
  Stack,
} from "@chakra-ui/react";
import React, { Fragment, useMemo } from "react";

import { useQuery } from "@apollo/client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";

import {
  Get_GroomingQuery,
  Page_Grooming_Procedure,
  Grooming_FragmentFragment,
  Get_GroomingQueryVariables,
  Page_Grooming_Procedure_NormalDog_Step1,
} from "@/__generated__/graphql";

import Image from "@/components/Image";
import RenderHTML from "@/components/RenderHTML";
import PageSkeleton from "@/components/PageSkeleton";
import ContactButton from "@/components/ContactButton";
import WrapperMainContent from "@/components/WrapperMainContent";

import { COURSE_PATH } from "@/paths";
import { GET_GROOMING } from "@/queries";

import SEO from "@/hocs/SEO";
import Faq from "./components/Faq";

import "swiper/css";
import "swiper/css/navigation";

const Gromming = () => {
  const { data } = useQuery<Get_GroomingQuery, Get_GroomingQueryVariables>(GET_GROOMING, {
    variables: {
      name: COURSE_PATH.grooming,
    },
  });

  const renderContent = useMemo(() => {
    if (data == undefined) return <PageSkeleton />;

    const { grooming } = (data?.pages?.nodes[0] || {}) as Grooming_FragmentFragment;

    const {
      faqs = {},
      description,
      procedure,
      descriptionAtFooter,
      whyWeShouldUseGrooming,
      images,
    } = grooming || {};

    const imageArr = (images || "").split("\n");

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
          CẮT TỈA LÔNG THÚ CƯNG
        </Heading>

        {description && <RenderHTML data={description} />}

        {whyWeShouldUseGrooming && (
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
              Tại sao nên tắm rửa và cắt tỉa lông chó thường xuyên?
            </Heading>
            <RenderHTML data={whyWeShouldUseGrooming} />
          </VStack>
        )}

        <Procedure data={procedure} />

        <Stack width="full" gap={{ base: 4, md: 6 }}>
          <Box
            alignSelf={{
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
              Hình Ảnh Thực Tế
            </Heading>
          </Box>
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
              {imageArr.map((el, idx) => {
                return (
                  <SwiperSlide key={idx}>
                    <Box aspectRatio={16 / 9}>
                      <Image src={el} alt={""} aspectRatio={16 / 9} />
                    </Box>
                  </SwiperSlide>
                );
              })}
            </StyledSwiper>
          </Box>
        </Stack>

        <Faq data={faqs} title="Những câu hỏi thường gặp về dịch vụ lưu trú thú cưng" />

        {descriptionAtFooter && (
          <VStack gap={4} width="full">
            <Box width="full" maxWidth="container.md" textAlign="center">
              <RenderHTML data={descriptionAtFooter} />
            </Box>
            <ContactButton>Liên hệ nhận báo giá</ContactButton>
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
  const { description, normalDog, unnormalDog } = (data || {}) as Page_Grooming_Procedure;

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
            Quy trình thực hiện Spa & Grooming
          </Heading>
        </GridItem>

        {description && (
          <GridItem
            placeSelf={{
              base: "center",
              md: "flex-start",
            }}
          >
            <RenderHTML data={description} />
          </GridItem>
        )}

        <GridItem>
          <VStack
            alignItems={{
              md: "flex-start",
            }}
            gap={4}
          >
            <Heading size="md">Dành cho chó khoẻ và bình thường</Heading>

            <Stepper orientation="vertical" index={-1} gap={0}>
              {Object.values(normalDog || {}).map((el, idx) => {
                const _el = el as Page_Grooming_Procedure_NormalDog_Step1;

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

        <GridItem>
          <VStack gap={4} alignItems="flex-start">
            <Heading size="md">Dành cho chó bị ốm</Heading>

            {unnormalDog?.beforeNote && <RenderHTML data={unnormalDog.beforeNote} />}

            <Stepper orientation="vertical" index={-1} gap={0}>
              {Object.values(unnormalDog || {}).map((el, idx) => {
                const _el = el as Page_Grooming_Procedure_NormalDog_Step1;

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

            {unnormalDog?.afterNote && <RenderHTML data={unnormalDog.afterNote} />}
          </VStack>
        </GridItem>
      </SimpleGrid>
    </Fragment>
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

export default Gromming;
