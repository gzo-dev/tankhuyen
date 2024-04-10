import {
  Get_VeterinaryQuery,
  Get_VeterinaryQueryVariables,
  Page_Veterinary_Reasons,
  Page_Veterinary_Reasons_Reason1,
  Page_Veterinary_WhyPetShouldDeworming,
  Page_Veterinary_WhyPetShouldDeworming_Reason1,
  Veterianry_FragmentFragment,
} from "@/__generated__/graphql";
import PageSkeleton from "@/components/PageSkeleton";
import RenderHTML from "@/components/RenderHTML";
import WrapperMainContent from "@/components/WrapperMainContent";
import { COURSE_PATH } from "@/paths";
import { GET_VETERINARY } from "@/queries";
import { useQuery } from "@apollo/client";
import {
  Flex,
  VStack,
  chakra,
  Heading,
  GridItem,
  Container,
  SimpleGrid,
} from "@chakra-ui/react";
import React, { useMemo } from "react";
import Faq from "./components/Faq";
import ContactButton from "@/components/ContactButton";
import SEO from "@/hocs/SEO";

const Veterinary = () => {
  const { data } = useQuery<Get_VeterinaryQuery, Get_VeterinaryQueryVariables>(
    GET_VETERINARY,
    {
      variables: {
        name: COURSE_PATH.veterinary,
      },
    }
  );

  const renderContent = useMemo(() => {
    if (data == undefined) return <PageSkeleton />;

    const veterianryData = (data?.pages?.nodes[0] || {}) as Veterianry_FragmentFragment;

    const {
      description,
      reasons,
      whatWeUse,
      procedure,
      caution,
      whyPetShouldDeworming,
      schedulingForDeworming,
      faqs,
    } = veterianryData?.veterinary || {};

    return (
      <VStack
        width="full"
        gap={{
          base: 4,
          md: 6,
        }}
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
          THÚ Y
        </Heading>

        {description && <RenderHTML data={description} />}

        <Vaccination data={reasons} />

        {whatWeUse && (
          <RenderHTML
            data={whatWeUse}
            sx={{
              "tr:not(:first-of-type) td:not(:first-of-type)": {
                textAlign: "center",
                color: "green.500",
              },
            }}
          />
        )}

        {procedure && <RenderHTML data={procedure} />}

        {caution && <RenderHTML data={caution} />}

        <Deworming data={whyPetShouldDeworming} />

        {schedulingForDeworming && (
          <RenderHTML
            sx={{
              "tr:not(:first-of-type) td:not(:first-of-type)": {
                color: "green.500",
              },
            }}
            data={schedulingForDeworming}
          />
        )}

        <Faq data={faqs} title="Một số câu hỏi thường gặp khi tiêm vaccine và tẩy giun" />

        <Flex alignSelf="center">
          <ContactButton />
        </Flex>
      </VStack>
    );
  }, [data]);

  return (
    <WrapperMainContent>
      <Container>{renderContent}</Container>
    </WrapperMainContent>
  );
};

const Deworming = ({ data = {} }: { data: any }) => {
  const { description } = data as Page_Veterinary_WhyPetShouldDeworming;

  return (
    <SimpleGrid columns={{ base: 1, md: 2 }} gap={{ base: 4, md: 0 }}>
      <GridItem colSpan={{ base: 1, md: 2 }} placeSelf="center">
        <Heading
          size="lg"
          textTransform="uppercase"
          className="underline"
          mb={{
            md: 4,
          }}
        >
          Tẩy giun
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
        const _el = el as Page_Veterinary_WhyPetShouldDeworming_Reason1;

        if (_el === null || typeof _el === "string") return null;

        return (
          <StyledVaccinationItem key={idx} padding={{ base: 4, md: 6, xl: 8 }} gap={2}>
            <Heading size="sm">{_el.question}</Heading>
            {_el.answer && <RenderHTML data={_el.answer} />}
          </StyledVaccinationItem>
        );
      })}
    </SimpleGrid>
  );
};

const Vaccination = ({ data = {} }: { data: any }) => {
  const { description } = data as Page_Veterinary_Reasons;

  return (
    <SimpleGrid columns={{ base: 1, md: 2 }} gap={{ base: 4, md: 0 }}>
      <GridItem
        colSpan={{ base: 1, md: 2 }}
        placeSelf="center"
        mb={{
          md: 4,
        }}
      >
        <Heading size="lg" textTransform="uppercase" className="underline">
          Tiêm Phòng
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
        const _el = el as Page_Veterinary_Reasons_Reason1;

        if (_el === null || typeof _el === "string") return null;

        return (
          <StyledVaccinationItem key={idx} padding={{ base: 4, md: 6, xl: 8 }} gap={2}>
            <Heading size="sm">{_el.title}</Heading>
            {_el.description}
          </StyledVaccinationItem>
        );
      })}
    </SimpleGrid>
  );
};

const StyledVaccinationItem = chakra(Flex, {
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

export default Veterinary;
