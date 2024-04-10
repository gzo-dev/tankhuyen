import { gql } from "@apollo/client";
import { FRAGMENT_MEDIA_ITEM } from "./fragments";

export const GET_BLOG_LIST = gql`
  ${FRAGMENT_MEDIA_ITEM}
  query GET_BLOG_LIST(
    $search: String = null
    $category: String = null
    $orderBy: OrderEnum!
    $before: String = null
    $after: String = null
  ) {
    posts(
      where: {
        search: $search
        categoryName: $category
        orderby: { field: DATE, order: $orderBy }
      }
      first: 12
      before: $before
      after: $after
    ) {
      pageInfo {
        startCursor
        endCursor
        hasPreviousPage
        hasNextPage
      }
      edges {
        cursor
        node {
          id
          title
          content
          date
          modified
          uri
          featuredImage {
            node {
              ...FRAGMENT_MEDIA_ITEM
            }
          }
          categories {
            nodes {
              id
              name
              slug
            }
          }
        }
      }
    }
  }
`;
