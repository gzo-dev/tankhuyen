import {
  Page_Homepage_Whyinvestdogtraining,
  Page_Homepage_Whyinvestdogtraining_Reason1,
} from "@/__generated__/graphql";
import {
  Box,
  Container,
  Heading,
  VStack,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Text,
  chakra,
} from "@chakra-ui/react";
import React from "react";

const WhyInvestDogTraining = ({ data }: { data: Page_Homepage_Whyinvestdogtraining }) => {
  const results = Object.values(data).filter((el) => {
    if (typeof el === "string") return false;
    if (el?.title == null) return false;
    return true;
  }) as Page_Homepage_Whyinvestdogtraining_Reason1[];

  return (
    <Box bgColor="rgb(250,250,250)">
      <Container maxWidth="container.md">
        <VStack paddingY={16} justifyContent="center" rowGap={16}>
          <Heading textAlign="center" className="underline">
            Tại sao nên đầu tư huấn luyện chó
          </Heading>

          <Accordion allowMultiple width="full">
            {results.map((el, idx) => {
              const descriptionArr = el.description?.split("\r\n").filter((el) => !!el);

              return (
                <AccordionItem key={idx}>
                  <AccordionButton justifyContent="space-between" gap={2}>
                    <Text fontSize="sm" fontWeight="bold" textAlign="left">
                      {el.title}
                    </Text>
                    <AccordionIcon />
                  </AccordionButton>
                  <AccordionPanel>
                    <StyledContent alignItems="flex-start">
                      {descriptionArr?.map((el, idx) => {
                        return <Text key={idx}>{el}</Text>;
                      })}
                    </StyledContent>
                  </AccordionPanel>
                </AccordionItem>
              );
            })}
          </Accordion>
        </VStack>
      </Container>
    </Box>
  );
};

const StyledContent = chakra(VStack, {
  baseStyle({ theme }) {
    return {
      "& :nth-of-type(odd)": {
        fontWeight: "bold",
      },
      "& :nth-of-type(even)": {
        marginBottom: 4,
      },
    };
  },
});

export default WhyInvestDogTraining;
