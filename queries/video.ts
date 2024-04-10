import { gql } from "@apollo/client";
import { FRAGMENT_PAGE_TYPE } from "./fragments";

export const GET_VIDEOS = gql`
  query GET_VIDEOS {
    training_small_dog: videos(where: { search: "training_small_dog" }, first: 24) {
      edges {
        node {
          video {
            type
            link
          }
        }
      }
    }
    training_big_dog: videos(where: { search: "training_big_dog" }, first: 24) {
      edges {
        node {
          video {
            type
            link
          }
        }
      }
    }
    training_advance_big_dog: videos(
      where: { search: "training_advance_big_dog" }
      first: 24
    ) {
      edges {
        node {
          video {
            type
            link
          }
        }
      }
    }
    daily_activity: videos(where: { search: "daily_activity" }, first: 24) {
      edges {
        node {
          video {
            type
            link
          }
        }
      }
    }
    insemination: videos(where: { search: "insemination" }, first: 24) {
      edges {
        node {
          video {
            type
            link
          }
        }
      }
    }
  }
`;

export const GET_METADATA_VIDEO = gql`
  ${FRAGMENT_PAGE_TYPE}
  query GET_METATA_VIDEO {
    pages(where: { name: "video" }) {
      nodes {
        ...FRAGMENT_PAGE_TYPE
        content
        metadataForVideo {
          basicCourseForSmallDog {
            ... on Page {
              uri
            }
          }
          basicCourseForBigDog {
            ... on Page {
              uri
            }
          }
          professionalCourse {
            ... on Page {
              uri
            }
          }
        }
      }
    }
  }
`;
