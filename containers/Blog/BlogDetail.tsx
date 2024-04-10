import { format } from "date-fns";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";

import {
  Tag,
  Flex,
  Text,
  VStack,
  Heading,
  Container,
  AspectRatio,
  Skeleton,
  SkeletonText,
} from "@chakra-ui/react";

import {
  Post,
  Get_Blog_DetailQuery,
  Get_Blog_DetailQueryVariables,
} from "@/__generated__/graphql";

import Image from "@/components/Image";
import { GET_BLOG_DETAIL } from "@/queries";
import RenderHTML from "@/components/RenderHTML";
import WrapperMainContent from "@/components/WrapperMainContent";
import SEO from "@/hocs/SEO";

const BlogDetail = () => {
  const router = useRouter();

  const { data } = useQuery<Get_Blog_DetailQuery, Get_Blog_DetailQueryVariables>(
    GET_BLOG_DETAIL,
    {
      variables: {
        name: router.query.slug as string,
      },
    }
  );

  const [isLoading, setIsLoading] = useState(!data);

  useEffect(() => {
    const node = data?.posts?.nodes[0];

    if (data) setIsLoading(false);

    if (data == undefined || node) return;

    router.replace(process.env.NEXT_PUBLIC_PREFIX_BLOG!);
  }, [data, router]);

  const node = (data?.posts?.nodes[0] || {}) as Post;

  const { title, content, categories, modified, featuredImage, date } = node;

  return (
    <WrapperMainContent>
      <SEO data={node as any} />
      <Container maxWidth="container.lg">
        <VStack gap={4} alignItems="flex-start">
          <Skeleton isLoaded={!isLoading} width="full">
            <Heading size="xl">{title}</Heading>
          </Skeleton>
          <Flex
            flexDirection={{ base: "column", sm: "row" }}
            gap={{ base: 2, sm: 4, lg: 8 }}
          >
            {date && (
              <Skeleton isLoaded={!isLoading}>
                <Text fontSize="sm">
                  <Text as="span" fontWeight="bold">
                    Ngày tạo:
                  </Text>{" "}
                  {format(new Date(date), "HH:mm dd/MM/yyyy")}
                </Text>
              </Skeleton>
            )}
            {modified && (
              <Skeleton isLoaded={!isLoading}>
                <Text fontSize="sm">
                  <Text as="span" fontWeight="bold">
                    Ngày cập nhật:
                  </Text>{" "}
                  {format(new Date(modified), "HH:mm dd/MM/yyyy")}
                </Text>
              </Skeleton>
            )}
          </Flex>
          {categories && (
            <Skeleton isLoaded={!isLoading}>
              <Flex gap={2} alignItems="center">
                <Heading size="sm" fontWeight="bold">
                  Danh mục:
                </Heading>
                {categories?.nodes.map((el) => {
                  return (
                    <Tag key={el.id} size="md" padding={2}>
                      {el.name}
                    </Tag>
                  );
                })}
              </Flex>
            </Skeleton>
          )}
          <Skeleton isLoaded={!isLoading} width="full">
            <AspectRatio
              ratio={16 / 9}
              maxWidth={{
                sm: "75%",
              }}
              width="full"
            >
              <Image
                src={
                  featuredImage?.node.sourceUrl || process.env.NEXT_PUBLIC_PLACEHOLDER!
                }
                alt={featuredImage?.node.altText || ""}
              />
            </AspectRatio>
          </Skeleton>
          {content && (
            <SkeletonText
              isLoaded={!isLoading}
              noOfLines={15}
              skeletonHeight={2}
              spacing={4}
            >
              <RenderHTML data={content} />
            </SkeletonText>
          )}
        </VStack>
      </Container>
    </WrapperMainContent>
  );
};

export default BlogDetail;
