import { useQuery } from "@apollo/client";
import React, { Fragment, useMemo } from "react";

import {
  Box,
  Flex,
  chakra,
  VStack,
  Heading,
  GridItem,
  Container,
  SimpleGrid,
} from "@chakra-ui/react";

import {
  Get_Pet_CareQuery,
  Page_Petcare_WhyChooseUs,
  Pet_Care_FragmentFragment,
  Get_Pet_CareQueryVariables,
  Page_Petcare_WhyChooseUs_Reason1,
} from "@/__generated__/graphql";

import { COURSE_PATH } from "@/paths";
import { GET_PET_CARE } from "@/queries";
import RenderHTML from "@/components/RenderHTML";
import PageSkeleton from "@/components/PageSkeleton";
import ContactButton from "@/components/ContactButton";
import WrapperMainContent from "@/components/WrapperMainContent";

import Faq from "./components/Faq";
import SEO from "@/hocs/SEO";

const PetCare = () => {
  const { data } = useQuery<Get_Pet_CareQuery, Get_Pet_CareQueryVariables>(GET_PET_CARE, {
    variables: {
      name: COURSE_PATH.pet_care,
    },
  });

  const renderContent = useMemo(() => {
    if (data == undefined) return <PageSkeleton />;

    const { petCare } = (data?.pages?.nodes[0] || {}) as Pet_Care_FragmentFragment;

    const {
      faqs = {},
      description,
      procedure,
      whyChooseUs,
      descriptionAtFooter,
    } = petCare || {};

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
          LƯU TRÚ THÚ CƯNG
        </Heading>

        {description && <RenderHTML data={description} />}

        <ChooseUsSection data={whyChooseUs} />

        {procedure && (
          <VStack gap={4}>
            <Heading
              size="md"
              textTransform="uppercase"
              textAlign="center"
              className="underline"
              placeSelf={{
                base: "center",
                md: "flex-start",
              }}
            >
              Quy trình tiếp nhận thú cưng lưu trú
            </Heading>
            <RenderHTML data={procedure} />
          </VStack>
        )}

        <Faq data={faqs} title="Những câu hỏi thường gặp về dịch vụ lưu trú thú cưng" />

        {descriptionAtFooter && (
          <VStack gap={4} width="full">
            <Box width="full" maxWidth="container.md">
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

const ChooseUsSection = ({ data }: { data: any }) => {
  const _data = data as Page_Petcare_WhyChooseUs;

  return (
    <Fragment>
      <SimpleGrid columns={{ base: 1, md: 2 }} gap={{ base: 4, md: 0 }}>
        <GridItem
          colSpan={{ base: 1, md: 2 }}
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
            mb={{ base: 4, md: 8 }}
          >
            Tại sao nên chọn dịch vụ lưu trú thú cưng tại Tân Khuyển?
          </Heading>
        </GridItem>
        <GridItem
          colSpan={{ base: 1, md: 2 }}
          display={{
            md: "block",
          }}
        />

        {Object.values(_data).map((el, idx) => {
          const _el = el as Page_Petcare_WhyChooseUs_Reason1;

          if (_el === null || typeof _el === "string" || _el.title == null) return null;

          return (
            <StyledFlex key={idx} padding={{ base: 4, md: 6, xl: 8 }} gap={2}>
              <Heading size="sm">{_el.title}</Heading>
              {_el.description}
            </StyledFlex>
          );
        })}
      </SimpleGrid>
    </Fragment>
  );
};

const StyledFlex = chakra(Flex, {
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

export default PetCare;
