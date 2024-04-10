import { isEmpty } from "lodash";
import { useQuery } from "@apollo/client";
import { BiChevronLeft, BiChevronRight, BiSearch } from "react-icons/bi";

import { GET_BLOG_LIST, GET_CATEGORY } from "@/queries";

import {
  OrderEnum,
  Get_CategoryQuery,
  Get_Blog_ListQuery,
  Get_Blog_ListQueryVariables,
} from "@/__generated__/graphql";
import {
  Flex,
  Grid,
  Text,
  Input,
  VStack,
  Heading,
  GridItem,
  Container,
  IconButton,
  SimpleGrid,
  InputGroup,
  InputRightElement,
  Icon,
  Spinner,
  Box,
} from "@chakra-ui/react";
import BlogCard from "@/components/BlogCard";
import { FormEvent, MouseEvent, useCallback, useMemo, useRef, useState } from "react";
import WrapperMainContent from "@/components/WrapperMainContent";

const BlogList = () => {
  const inputRef = useRef<HTMLInputElement | null>();

  const [pagination, setPagination] = useState({
    limit: 12,
    offset: 0,
  });

  const [isLoading, setIsLoading] = useState(false);

  const [params, setParams] = useState<Get_Blog_ListQueryVariables>({
    orderBy: OrderEnum.Desc,
    category: null,
  });

  const {
    data,
    client,
    fetchMore,
    loading: loadingNewRequest,
  } = useQuery<Get_Blog_ListQuery, Get_Blog_ListQueryVariables>(GET_BLOG_LIST, {
    variables: params,
  });

  const { data: categoryData } = useQuery<Get_CategoryQuery>(GET_CATEGORY);

  const onSelectCategory = useCallback(
    (e: MouseEvent<HTMLHeadingElement>) => {
      const category = e.currentTarget.dataset.category as string | undefined;

      if (category == undefined) return;

      setIsLoading(true);

      const newParams = Object.assign({}, params, {
        before: null,
        after: null,
        category: params.category === category ? null : category,
      });

      const isInCached = client.readQuery<
        Get_Blog_ListQuery,
        Get_Blog_ListQueryVariables
      >({
        query: GET_BLOG_LIST,
        variables: newParams,
      });

      setParams(newParams);

      if (isInCached) {
        setPagination({
          offset: 0,
          limit: 12,
        });

        setIsLoading(false);
      } else {
        fetchMore({
          variables: newParams,
        }).then(() => {
          setPagination({
            offset: 0,
            limit: 12,
          });

          setIsLoading(false);
        });
      }
    },
    [fetchMore, client, params]
  );

  const onSearchBlogPost = useCallback(
    (e: FormEvent<HTMLInputElement>) => {
      e.preventDefault();

      setIsLoading(true);

      const newParams = Object.assign({}, params, {
        before: null,
        after: null,
        search: inputRef.current?.value,
      });

      fetchMore({
        variables: newParams,
      }).then(() => {
        setPagination({
          offset: 0,
          limit: 12,
        });

        setIsLoading(false);
      });
    },
    [fetchMore, params]
  );

  const renderFilter = useMemo(() => {
    const categoryEdges = categoryData?.categories?.edges || [];

    return (
      <VStack alignItems="flex-start" gap={4}>
        <InputGroup as="form" onSubmit={onSearchBlogPost}>
          <Input
            placeholder="Tìm kiếm..."
            ref={(instanceRef) => {
              inputRef.current = instanceRef;
            }}
          />
          <InputRightElement as="button" type="submit">
            <Flex
              cursor="pointer"
              _hover={{ color: "primary.500", transition: "all 500ms" }}
            >
              <Icon as={BiSearch} boxSize={5} />
            </Flex>
          </InputRightElement>
        </InputGroup>

        <VStack alignItems="flex-start" gap={4}>
          <Heading size="md">Lọc theo danh mục</Heading>

          {categoryEdges.map((el) => {
            return (
              <Heading
                size="sm"
                key={el.node.id}
                cursor="pointer"
                fontWeight={params.category === el.node.slug ? "bold" : "normal"}
                color={params.category === el.node.slug ? "primary.500" : undefined}
                data-category={el.node.slug}
                onClick={onSelectCategory}
              >
                {el.node.name}
              </Heading>
            );
          })}
        </VStack>
      </VStack>
    );
  }, [categoryData, onSearchBlogPost, onSelectCategory, params.category]);

  return (
    <WrapperMainContent>
      <Container>
        <Grid
          templateColumns={{ base: "1fr", lg: "repeat(4,1fr)" }}
          columnGap={{ base: 0, lg: 8 }}
          rowGap={{ base: 4, lg: 8 }}
        >
          <GridItem colSpan={1}>
            <Box
              width="full"
              position={{
                lg: "sticky",
              }}
              top={{
                lg: 136,
              }}
            >
              {renderFilter}
            </Box>
          </GridItem>
          <GridItem colSpan={3}>
            <VStack gap={8}>
              <Heading
                alignSelf="flex-start"
                display="inline-block"
                className="underline"
              >
                Danh sách bài viết
              </Heading>

              {data == undefined && loadingNewRequest && (
                <Spinner emptyColor="gray.200" />
              )}

              {data != undefined && isEmpty(data?.posts?.edges) && (
                <Text textAlign="center" fontWeight="bold">
                  Không tìm thấy bài viết liên quan
                </Text>
              )}
              <SimpleGrid columns={{ base: 1, md: 2, xl: 3 }} gap={4}>
                {data?.posts?.edges
                  .slice(pagination.offset, pagination.offset + pagination.limit)
                  .map((el) => {
                    return (
                      <BlogCard
                        isLoading={isLoading}
                        key={el.cursor}
                        {...(el.node as any)}
                      />
                    );
                  })}
              </SimpleGrid>

              {!isEmpty(data?.posts?.edges || []) && (
                <Flex gap={4}>
                  <IconButton
                    aria-label="Previous Page"
                    icon={<BiChevronLeft />}
                    isDisabled={pagination.offset === 0}
                    onClick={() => {
                      const { limit, offset } = pagination;
                      let newOffset = offset - limit;

                      if (newOffset < 0) newOffset = 0;

                      setPagination({
                        offset: newOffset,
                        limit,
                      });
                    }}
                  />
                  <IconButton
                    aria-label="Next Page"
                    icon={<BiChevronRight />}
                    isDisabled={
                      !data?.posts?.pageInfo.hasNextPage &&
                      data?.posts?.pageInfo.endCursor ===
                        data?.posts?.edges
                          .slice(pagination.offset, pagination.offset + pagination.limit)
                          .at(-1)?.cursor
                    }
                    onClick={() => {
                      setIsLoading(true);
                      const endCursor = data?.posts?.pageInfo.endCursor;

                      const newParams = Object.assign({}, params, { after: endCursor });

                      setParams(newParams);

                      fetchMore({
                        variables: newParams,
                      }).then(() => {
                        const { limit, offset } = pagination;

                        const newOffset = offset + limit;

                        setPagination({
                          offset: newOffset,
                          limit,
                        });

                        setIsLoading(false);
                      });
                    }}
                  />
                </Flex>
              )}
            </VStack>
          </GridItem>
        </Grid>
      </Container>
    </WrapperMainContent>
  );
};

export default BlogList;
