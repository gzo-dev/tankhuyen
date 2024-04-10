import { gql } from "@apollo/client";

export const FRAGMENT_MEDIA_ITEM = gql`
  fragment FRAGMENT_MEDIA_ITEM on MediaItem {
    altText
    sourceUrl
    mediaDetails {
      width
      height
    }
  }
`;

export const FRAGMENT_LINK_ITEM = gql`
  fragment FRAGMENT_LINK_ITEM on AcfLink {
    title
    target
    url
  }
`;

export const FRAGMENT_PAGE_TYPE = gql`
  ${FRAGMENT_MEDIA_ITEM}
  fragment FRAGMENT_PAGE_TYPE on Page {
    featuredImage {
      node {
        ...FRAGMENT_MEDIA_ITEM
      }
    }
    seo {
      title
      metaDesc
    }
  }
`;

export const FRAGMENT_POST_TYPE = gql`
  ${FRAGMENT_MEDIA_ITEM}
  fragment FRAGMENT_POST_TYPE on Post {
    featuredImage {
      node {
        ...FRAGMENT_MEDIA_ITEM
      }
    }
    seo {
      title
      metaDesc
    }
  }
`;
