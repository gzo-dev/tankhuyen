import {
  Text,
  VStack,
  Heading,
  Accordion,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  AccordionButton,
} from "@chakra-ui/react";

import RenderHTML from "@/components/RenderHTML";
import { Page_Basiccourse_Faqs } from "@/__generated__/graphql";

const Faq = ({ data, title }: { data: any; title: string }) => {
  const _data = data as Page_Basiccourse_Faqs;

  return (
    <VStack width="full" gap={4}>
      <Heading size="md" className="underline" textAlign="center" mb={4}>
        {title}
      </Heading>

      <Accordion width="full" maxWidth="container.md" allowToggle>
        {Object.values(_data).map((el, idx) => {
          if (el == null || typeof el === "string" || !el.answer) return null;

          return (
            <AccordionItem key={idx}>
              <AccordionButton justifyContent="space-between" gap={2}>
                <Text fontSize="sm" fontWeight="bold" textAlign="left">
                  {el.question}
                </Text>
                <AccordionIcon />
              </AccordionButton>
              <AccordionPanel>
                <RenderHTML data={el.answer || ""} />
              </AccordionPanel>
            </AccordionItem>
          );
        })}
      </Accordion>
    </VStack>
  );
};

export default Faq;
