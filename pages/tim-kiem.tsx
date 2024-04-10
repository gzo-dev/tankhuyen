import prefetchData from "@/libs/prefetch";
import Search from "@/containers/Search/Search";
import { addApolloState, initializeApollo } from "@/libs/apolloClient";

import { GetServerSidePropsContext } from "next";
import { get } from "lodash";
import { GET_CATEGORY, GET_SEARCH_PAGE } from "@/queries";
import {
  Search_Post_QueryQuery,
  Search_Post_QueryQueryVariables,
  OrderEnum,
} from "@/__generated__/graphql";

const SearchPage = () => {
  return <Search />;
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { query } = context;

  try {
    const apolloClient = initializeApollo();

    await prefetchData(apolloClient);

    const searchQuery = get(query, "search", null) as string | null;
    const categoryName = get(query, "category", null) as string | null;

    await Promise.all([
      apolloClient.query<Search_Post_QueryQuery, Search_Post_QueryQueryVariables>({
        query: GET_SEARCH_PAGE,
        variables: {
          search: searchQuery,
          category: categoryName,
          orderBy: OrderEnum.Desc,
        },
      }),
      apolloClient.query({ query: GET_CATEGORY }),
    ]);

    return addApolloState(apolloClient, {
      props: {},
    });
  } catch {
    return {
      props: {},
    };
  }
}

export default SearchPage;
