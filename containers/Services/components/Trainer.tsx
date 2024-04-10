import React from "react";
import { useRouter } from "next/router";

import {
  List,
  Button,
  Heading,
  ListIcon,
  ListItem,
  GridItem,
  SimpleGrid,
  Box,
} from "@chakra-ui/react";
import { BiLike } from "react-icons/bi";

import Image from "@/components/Image";
import RenderHTML from "@/components/RenderHTML";
import { Page_Basiccourse_Trainer } from "@/__generated__/graphql";

const Trainer = (props: any) => {
  const { description, image, link, skills } = props as Page_Basiccourse_Trainer;

  const router = useRouter();

  return (
    <SimpleGrid columns={{ base: 1, md: 2 }} gap={{ base: 4, md: 6 }} width="full">
      <GridItem
        colSpan={{ base: 1, md: 2 }}
        placeSelf={{
          base: "center",
          md: "flex-start",
        }}
      >
        <Heading size="md" className="underline" textAlign="center" mb={4}>
          Huấn luyện viên chính của khóa học
        </Heading>
      </GridItem>

      <GridItem colSpan={{ base: 1, md: 2 }}>
        {description && <RenderHTML data={description} />}
      </GridItem>

      {image && (
        <Box borderRadius={16} overflow="hidden">
          <Image src={image.sourceUrl!} alt={image.altText!} aspectRatio={16 / 9} />
        </Box>
      )}

      {skills && (
        <List spacing={2}>
          {skills.split(/\r?\n/).map((el, idx) => {
            if (!el) return null;

            return (
              <ListItem key={idx} display="flex" alignItems="center">
                <ListIcon as={BiLike} />
                {el}
              </ListItem>
            );
          })}
        </List>
      )}

      {link && (
        <GridItem colSpan={{ base: 1, md: 2 }} placeSelf="center">
          <Button
            onClick={() => {
              router.push(link.uri!);
            }}
          >
            Xem chi tiết
          </Button>
        </GridItem>
      )}
    </SimpleGrid>
  );
};

export default Trainer;
