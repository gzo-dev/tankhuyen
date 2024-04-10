import { gql } from "@apollo/client";

export const GET_CATEGORY = gql`
  query GET_CATEGORY($name: String = null) {
    categories(where: { nameLike: $name }, first: 50) {
      edges {
        node {
          id
          name
          slug
        }
      }
    }
  }
`;
