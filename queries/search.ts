import { gql } from "@apollo/client";
import { FRAGMENT_MEDIA_ITEM } from "./fragments";

export const GET_SEARCH_PAGE = gql`
  ${FRAGMENT_MEDIA_ITEM}
  query SEARCH_POST_QUERY(
    $search: String = null
    $category: String = null
    $orderBy: OrderEnum!
    $after: String = null
  ) {
    posts(
      where: {
        search: $search
        categoryName: $category
        orderby: { field: DATE, order: $orderBy }
      }
      first: 12
      after: $after
    ) {
      pageInfo {
        startCursor
        endCursor
        hasPreviousPage
        hasNextPage
      }
      edges {
        node {
          __typename
          id
          uri
          title
          content
          modified
          categories {
            nodes {
              id
              name
              slug
            }
          }
          featuredImage {
            node {
              ...FRAGMENT_MEDIA_ITEM
            }
          }
        }
      }
    }
  }
`;
