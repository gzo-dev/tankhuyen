import Link from "next/link";
import { format } from "date-fns";
import {
  AspectRatio,
  Box,
  Flex,
  Heading,
  Skeleton,
  Tag,
  Text,
  VStack,
} from "@chakra-ui/react";

import Image from "./Image";
import RenderHTML from "./RenderHTML";
import { Post } from "@/__generated__/graphql";

interface BlogCardProps {
  title: Post["title"];
  content: Post["content"];
  featuredImage: Post["featuredImage"] | null;
  uri: Post["uri"];
  categories: Post["categories"];
  modified: Post["modified"];
  isLoading?: boolean;
}

const BlogCard = (props: BlogCardProps) => {
  const { title, featuredImage, content, uri, categories, modified, isLoading } = props;

  const imageSrc = featuredImage?.node.sourceUrl || process.env.NEXT_PUBLIC_PLACEHOLDER!;
  const altText = featuredImage?.node.altText || "";

  return (
    <Link href={`${process.env.NEXT_PUBLIC_PREFIX_BLOG!}${uri}`}>
      <Box padding={4} boxShadow="md" height="full" borderRadius={8}>
        <Flex flexDirection="column" gap={4} height="full">
          <Box width="full">
            <Skeleton isLoaded={!isLoading}>
              <AspectRatio ratio={2 / 1} borderRadius={4} overflow="hidden">
                <Image src={imageSrc} alt={altText} />
              </AspectRatio>
            </Skeleton>
          </Box>
          <VStack alignItems="flex-start" height="full">
            <Skeleton isLoaded={!isLoading}>
              <Heading size="md">{title}</Heading>
            </Skeleton>
            <Skeleton isLoaded={!isLoading}>
              {modified && (
                <Text fontSize="xs">
                  {format(new Date(modified), "HH:mm dd/MM/yyyy")}
                </Text>
              )}
            </Skeleton>
            <Skeleton isLoaded={!isLoading}>
              {content && (
                <RenderHTML
                  data={content}
                  DOMPurifyConfig={{
                    ALLOWED_TAGS: [],
                  }}
                  noOfLines={3}
                  fontSize="sm"
                />
              )}
            </Skeleton>

            <Skeleton isLoaded={!isLoading}>
              <Flex gap={2}>
                {categories?.nodes.map((el) => {
                  return (
                    <Tag key={el.id} size="sm" padding={2}>
                      {el.name}
                    </Tag>
                  );
                })}
              </Flex>
            </Skeleton>
          </VStack>
        </Flex>
      </Box>
    </Link>
  );
};

export default BlogCard;
