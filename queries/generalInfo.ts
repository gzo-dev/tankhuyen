import { gql } from "@apollo/client";
import { FRAGMENT_MEDIA_ITEM } from "./fragments";

export const GET_GENERAL_INFO = gql`
  ${FRAGMENT_MEDIA_ITEM}
  query GET_GENERAL_INFO {
    blockcodes(where: { title: "General Info" }) {
      nodes {
        generalInfo {
          title
          address
          hotline
          description
          map
          zalo
          facebook
          youtube
          canonical
          hotline
          banner {
            ...FRAGMENT_MEDIA_ITEM
          }
          logo {
            ...FRAGMENT_MEDIA_ITEM
          }
          alternativelogo {
            ...FRAGMENT_MEDIA_ITEM
          }
        }
      }
    }
  }
`;
