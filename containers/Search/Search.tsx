import { get } from "lodash";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import { GET_SEARCH_PAGE } from "@/queries";

import {
  OrderEnum,
  Search_Post_QueryQuery,
  Search_Post_QueryQueryVariables,
} from "@/__generated__/graphql";
import {
  Button,
  Container,
  Flex,
  Grid,
  GridItem,
  Heading,
  Spinner,
  Text,
} from "@chakra-ui/react";
import BlogCard from "@/components/BlogCard";
import { useCallback, useEffect, useMemo, useState } from "react";
import WrapperMainContent from "@/components/WrapperMainContent";

const Search = () => {
  const { query, events } = useRouter();

  const searchQuery = get(query, "search", null) as string | null;
  const categoryName = get(query, "category", null) as string | null;

  const [params, setParams] = useState<Search_Post_QueryQueryVariables>({
    search: searchQuery,
    category: categoryName,
    orderBy: OrderEnum.Desc,
  });

  const { data, fetchMore } = useQuery<
    Search_Post_QueryQuery,
    Search_Post_QueryQueryVariables
  >(GET_SEARCH_PAGE, {
    variables: params,
  });

  const [isLoading, setIsLoading] = useState(!data);

  useEffect(() => {
    const handleRouteChange = () => {
      const searchQuery = get(query, "search", null) as string | null;
      const categoryName = get(query, "category", null) as string | null;

      setIsLoading(true);

      const newParams = Object.assign({}, params, {
        after: null,
        search: searchQuery,
        category: categoryName,
      });

      setParams(newParams);

      fetchMore({
        variables: newParams,
      }).finally(() => {
        setIsLoading(false);
      });
    };

    events.on("routeChangeComplete", handleRouteChange);

    return () => {
      events.off("routeChangeComplete", handleRouteChange);
    };
  }, [events, query, params, fetchMore]);

  const fetchMoreHandler = useCallback(() => {
    const endCursor = data?.posts?.pageInfo.endCursor as string | undefined;

    setIsLoading(true);

    let newParams = Object.assign({}, params, {
      after: endCursor,
    });

    fetchMore({
      variables: newParams,
    }).finally(() => {
      setParams(newParams);
      setIsLoading(false);
    });
  }, [data, fetchMore, params]);

  const renderContent = useMemo(() => {
    if (data == undefined) {
      return (
        <GridItem colSpan={4} marginX="auto">
          <Spinner emptyColor="gray.200" />
        </GridItem>
      );
    }

    const edges = data?.posts?.edges || [];

    if (edges.length === 0) {
      return (
        <GridItem colSpan={4}>
          <Text textAlign="center" fontWeight="bold">
            Không tìm thấy bài viết liên quan
          </Text>
        </GridItem>
      );
    }

    return edges.map((el) => {
      return (
        <GridItem colSpan={1} key={el.node.id}>
          <BlogCard
            title={el.node.title}
            content={el.node.content}
            featuredImage={el.node.featuredImage as any}
            categories={el.node.categories as any}
            uri={el.node.uri}
            modified={el.node.modified}
            isLoading={isLoading}
          />
        </GridItem>
      );
    });
  }, [data, isLoading]);

  return (
    <WrapperMainContent>
      <Container>
        <Grid
          templateColumns={{
            base: "1fr",
            sm: "repeat(2,1fr)",
            lg: "repeat(3,1fr)",
            xl: "repeat(4,1fr)",
          }}
          gap={4}
        >
          <GridItem
            colSpan={{
              base: 1,
              sm: 2,
              lg: 3,
              xl: 4,
            }}
            marginX="auto"
            marginBottom={4}
          >
            <Heading textAlign="center" className="underline">
              Kết quả tìm kiếm
            </Heading>
          </GridItem>

          {renderContent}

          {data?.posts?.pageInfo.hasNextPage && (
            <GridItem
              colSpan={{
                base: 1,
                sm: 2,
                lg: 3,
                xl: 4,
              }}
              marginX="auto"
            >
              <Button
                onClick={fetchMoreHandler}
                isLoading={isLoading}
                isDisabled={isLoading}
              >
                Tải thêm
              </Button>
            </GridItem>
          )}
        </Grid>
      </Container>
    </WrapperMainContent>
  );
};

export default Search;
