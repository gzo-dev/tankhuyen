import { gql } from "@apollo/client";
import { FRAGMENT_MEDIA_ITEM } from "./fragments";

export const GET_DOGS = gql`
  ${FRAGMENT_MEDIA_ITEM}
  query GET_DOGS {
    dogs(first: 24) {
      edges {
        node {
          id
          slug
          title
          dog {
            inStock
            properties
            description
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

export const GET_DETAIL_DOG = gql`
  ${FRAGMENT_MEDIA_ITEM}
  query GET_DETAIL_DOG($search: String!) {
    dogs(where: { search: $search }) {
      edges {
        node {
          seo {
            title
            metaDesc
          }
          id
          slug
          title
          dog {
            properties
            description
            inStock
            policies
            video
            sliders {
              image1 {
                ...FRAGMENT_MEDIA_ITEM
              }
              image2 {
                ...FRAGMENT_MEDIA_ITEM
              }
              image3 {
                ...FRAGMENT_MEDIA_ITEM
              }
              image4 {
                ...FRAGMENT_MEDIA_ITEM
              }
              image5 {
                ...FRAGMENT_MEDIA_ITEM
              }
              image6 {
                ...FRAGMENT_MEDIA_ITEM
              }
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
