import { gql } from "@apollo/client";

export const GET_NAVIGATION = gql`
  query GET_NAVIGATION {
    menuItems(where: { location: MENU_1 }, first: 50) {
      edges {
        node {
          label
          url
          id
          parentId
          path
        }
      }
    }
  }
`;
