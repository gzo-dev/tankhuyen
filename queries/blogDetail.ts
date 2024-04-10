import { gql } from "@apollo/client";
import { FRAGMENT_MEDIA_ITEM, FRAGMENT_POST_TYPE } from "./fragments";

export const GET_BLOG_DETAIL = gql`
  ${FRAGMENT_POST_TYPE}
  ${FRAGMENT_MEDIA_ITEM}
  query GET_BLOG_DETAIL($name: String!) {
    posts(where: { name: $name }) {
      nodes {
        ...FRAGMENT_POST_TYPE
        id
        title
        content
        date
        modified
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
`;
