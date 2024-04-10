import { gql } from "@apollo/client";
import { FRAGMENT_MEDIA_ITEM, FRAGMENT_PAGE_TYPE } from "./fragments";

export const GET_ABOUT_US = gql`
  ${FRAGMENT_PAGE_TYPE}
  ${FRAGMENT_MEDIA_ITEM}
  query GET_ABOUT_US {
    pages(where: { name: "gioi-thieu" }) {
      nodes {
        ...FRAGMENT_PAGE_TYPE
        aboutUs {
          aboutTrainer
          advantages {
            advantage1 {
              title
              description
            }
            advantage2 {
              title
              description
            }
            advantage3 {
              title
              description
            }
            advantage3 {
              title
              description
            }
            advantage4 {
              title
              description
            }
            advantage5 {
              title
              description
            }
            advantage6 {
              title
              description
            }
          }
          coreValues {
            efficiency
            humanitarian
            professional
          }
          experiences {
            experience1
            experience2
            experience3
            experience4
            description
          }
          facility {
            facility1 {
              title
              description
              image {
                ...FRAGMENT_MEDIA_ITEM
              }
            }
            facility2 {
              title
              description
              image {
                ...FRAGMENT_MEDIA_ITEM
              }
            }
            facility3 {
              title
              description
              image {
                ...FRAGMENT_MEDIA_ITEM
              }
            }
            facility4 {
              title
              description
              image {
                ...FRAGMENT_MEDIA_ITEM
              }
            }
            description
          }
          mission
          vision
        }
      }
    }
  }
`;
