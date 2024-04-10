import { get } from "lodash";
import React, { Fragment, useMemo } from "react";
import { useQuery } from "@apollo/client";

import { LuBadgeCheck } from "react-icons/lu";
import { TbSettingsUp } from "react-icons/tb";
import { BiBulb, BiGroup } from "react-icons/bi";
import { IoTelescopeOutline } from "react-icons/io5";
import { PiTargetLight, PiFirstAidKit, PiDog } from "react-icons/pi";

import {
  Box,
  Text,
  Icon,
  Flex,
  chakra,
  VStack,
  Heading,
  GridItem,
  Container,
  SimpleGrid,
  AspectRatio,
} from "@chakra-ui/react";

import {
  Fragment_Page_TypeFragment,
  Get_About_UsQuery,
  Page_Aboutus_Facility_Facility1,
  Page_Aboutus_Advantages_Advantage1,
} from "@/__generated__/graphql";
import SEO from "@/hocs/SEO";
import { GET_ABOUT_US } from "@/queries";

import Image from "@/components/Image";
import RenderHTML from "@/components/RenderHTML";
import WrapperMainContent from "@/components/WrapperMainContent";
import PageSkeleton from "@/components/PageSkeleton";

const AboutUs = () => {
  const { data } = useQuery<Get_About_UsQuery>(GET_ABOUT_US);

  const seoContent = get(data, "pages.nodes[0]") as
    | Fragment_Page_TypeFragment
    | undefined;

  const renderContent = useMemo(() => {
    if (data == undefined) return <PageSkeleton />;

    const aboutData = data?.pages?.nodes?.[0].aboutUs || {};

    const {
      aboutTrainer,
      advantages,
      coreValues,
      experiences,
      facility,
      mission,
      vision,
    } = aboutData;

    const { description, experience1, experience2, experience3 } = experiences || {};
    const { efficiency, humanitarian, professional } = coreValues || {};

    return (
      <VStack gap={{ base: 8, lg: 16 }} alignItems={{ base: "center", lg: "flex-start" }}>
        <Heading className="underline">Về chúng tôi</Heading>

        <SimpleGrid
          columns={{ base: 1, md: 3 }}
          width="full"
          rowGap={{
            base: 4,
            lg: 0,
          }}
        >
          <GridItem colSpan={{ base: 1, md: 3 }}>
            {description && <RenderHTML data={description || ""} />}
          </GridItem>
          {experience1 && (
            <VStack paddingY={8} gap={4} placeSelf="center" width="full" bg="primary.50">
              <Icon boxSize={12} as={PiDog} color="primary.500" />
              <Heading size="sm">{experience1}</Heading>
            </VStack>
          )}

          {experience2 && (
            <VStack paddingY={8} gap={4} placeSelf="center" width="full" bg="primary.50">
              <Icon boxSize={12} as={BiGroup} color="primary.500" />
              <Heading size="sm">{experience2}</Heading>
            </VStack>
          )}
          {experience3 && (
            <VStack paddingY={8} gap={4} placeSelf="center" width="full" bg="primary.50">
              <Icon boxSize={12} as={BiBulb} color="primary.500" />
              <Heading size="sm">{experience3}</Heading>
            </VStack>
          )}
        </SimpleGrid>

        <SimpleGrid
          columns={{
            base: 1,
            md: 2,
          }}
          width="full"
          gap={{ base: 4, md: 6 }}
        >
          <StyledBox>
            <Icon boxSize={12} as={IoTelescopeOutline} color="primary.500" />
            <Heading size="md">Sứ Mệnh</Heading>
            <Text textAlign="justify">{mission}</Text>
          </StyledBox>

          <StyledBox>
            <Icon boxSize={12} as={PiTargetLight} color="primary.500" />
            <Heading size="md">Tầm Nhìn</Heading>
            <Text textAlign="justify">{vision}</Text>
          </StyledBox>
        </SimpleGrid>

        <SimpleGrid columns={{ base: 1, md: 3 }} width="full" gap={{ base: 4, md: 6 }}>
          <GridItem
            colSpan={{ base: 1, md: 3 }}
            marginX={{
              base: "auto",
              lg: "0 auto",
            }}
          >
            <Heading size="lg" className="underline" marginBottom={{ base: 4, lg: 6 }}>
              Giá trị cốt lõi
            </Heading>
          </GridItem>
          <StyledBox>
            <Icon boxSize={12} as={LuBadgeCheck} color="primary.500" />
            <Heading size="md">Chuyên Nghiệp</Heading>
            <Text textAlign="justify">{professional}</Text>
          </StyledBox>

          <StyledBox>
            <Icon boxSize={12} as={PiFirstAidKit} color="primary.500" />
            <Heading size="md">Nhân Đạo</Heading>
            <Text textAlign="justify">{humanitarian}</Text>
          </StyledBox>

          <StyledBox>
            <Icon boxSize={12} as={TbSettingsUp} color="primary.500" />
            <Heading size="md">Hiệu Quả</Heading>
            <Text textAlign="justify">{efficiency}</Text>
          </StyledBox>
        </SimpleGrid>

        {aboutTrainer && (
          <RenderHTML
            sx={{
              "& :first-of-type": {
                marginTop: 0,
              },
            }}
            data={aboutTrainer}
          />
        )}

        <VStack gap={{ base: 4, md: 6 }} justifyItems="flex-start" width="full">
          <Heading size="lg" className="underline" marginBottom={{ base: 4, lg: 8 }}>
            Cơ sở vật chất
          </Heading>
          {Object.values(facility || {})
            .filter((el) => el != null && typeof el !== "string")
            .map((el, idx) => {
              const _el = el as Page_Aboutus_Facility_Facility1;

              return (
                <SimpleGrid
                  columns={{ base: 1, md: 2 }}
                  width="full"
                  gap={{ base: 4, md: 6 }}
                  key={idx}
                >
                  <Box>
                    <AspectRatio ratio={16 / 9}>
                      <Image
                        src={_el.image?.sourceUrl || process.env.NEXT_PUBLIC_PLACEHOLDER!}
                        alt={_el.image?.altText || ""}
                      />
                    </AspectRatio>
                  </Box>
                  <VStack gap={4} alignItems="flex-start" justifyContent="center">
                    <Heading size="md">{_el.title}</Heading>
                    <Text>{_el.description}</Text>
                  </VStack>
                </SimpleGrid>
              );
            })}
        </VStack>

        <SimpleGrid
          columns={{ base: 1, md: 2, lg: 3 }}
          width="full"
          gap={{ base: 4, md: 6 }}
        >
          <GridItem
            colSpan={{ base: 1, md: 2, lg: 3 }}
            marginX={{
              base: "auto",
              lg: "0 auto",
            }}
          >
            <Heading size="lg" className="underline" marginBottom={{ base: 4, lg: 8 }}>
              Ưu điểm của Tân Khuyển
            </Heading>
          </GridItem>

          {Object.values(advantages || {})
            .filter((el) => typeof el !== "string" && el != null)
            .map((el, idx) => {
              const _el = el as Page_Aboutus_Advantages_Advantage1;

              return (
                <StyledBox key={idx}>
                  <Heading size="md">{_el.title}</Heading>
                  <Text textAlign="justify">{_el.description}</Text>
                </StyledBox>
              );
            })}
        </SimpleGrid>
      </VStack>
    );
  }, [data]);

  return (
    <Fragment>
      <SEO data={seoContent} />
      <WrapperMainContent>
        <Container>{renderContent}</Container>
      </WrapperMainContent>
    </Fragment>
  );
};

const StyledBox = chakra(Flex, {
  baseStyle() {
    return {
      width: "full",
      height: "full",
      bgColor: "gray.50",
      alignItems: "center",
      flexDirection: "column",
      gap: 4,
      padding: {
        base: 4,
        sm: 8,
        xl: 12,
      },
    };
  },
});

export default AboutUs;
