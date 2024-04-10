import { gql } from "@apollo/client";
import { FRAGMENT_PAGE_TYPE } from "./fragments";

export const GET_GALLERY = gql`
  ${FRAGMENT_PAGE_TYPE}
  query GET_GALLERY($name: String!) {
    pages(where: { name: $name }) {
      nodes {
        ...FRAGMENT_PAGE_TYPE
        gallery {
          images
        }
      }
    }
  }
`;
