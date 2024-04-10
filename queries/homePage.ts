import { gql } from "@apollo/client";
import { FRAGMENT_MEDIA_ITEM, FRAGMENT_PAGE_TYPE } from "./fragments";

export const GET_HOME_PAGE = gql`
  ${FRAGMENT_PAGE_TYPE}
  ${FRAGMENT_MEDIA_ITEM}
  query HOME_PAGE {
    pages(where: { name: "trang-chu" }) {
      nodes {
        ...FRAGMENT_PAGE_TYPE
        homePage {
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
          services {
            service1 {
              title
              description
              image {
                ...FRAGMENT_MEDIA_ITEM
              }
              link {
                ... on Page {
                  id
                  uri
                }
              }
            }
            service2 {
              title
              description
              image {
                ...FRAGMENT_MEDIA_ITEM
              }
              link {
                ... on Page {
                  id
                  uri
                }
              }
            }
            service3 {
              title
              description
              image {
                ...FRAGMENT_MEDIA_ITEM
              }
              link {
                ... on Page {
                  id
                  uri
                }
              }
            }
            service4 {
              title
              description
              image {
                ...FRAGMENT_MEDIA_ITEM
              }
              link {
                ... on Page {
                  id
                  uri
                }
              }
            }
            service5 {
              title
              description
              image {
                ...FRAGMENT_MEDIA_ITEM
              }
              link {
                ... on Page {
                  id
                  uri
                }
              }
            }
            service6 {
              title
              description
              image {
                ...FRAGMENT_MEDIA_ITEM
              }
              link {
                ... on Page {
                  id
                  uri
                }
              }
            }
            service7 {
              title
              description
              image {
                ...FRAGMENT_MEDIA_ITEM
              }
              link {
                ... on Page {
                  id
                  uri
                }
              }
            }
            service8 {
              title
              description
              image {
                ...FRAGMENT_MEDIA_ITEM
              }
              link {
                ... on Page {
                  id
                  uri
                }
              }
            }
            service9 {
              title
              description
              image {
                ...FRAGMENT_MEDIA_ITEM
              }
              link {
                ... on Page {
                  id
                  uri
                }
              }
            }
          }
          goal
          whychooseus {
            reason1 {
              title
              description
            }
            reason2 {
              title
              description
            }
            reason3 {
              title
              description
            }
            reason4 {
              title
              description
            }
            reason5 {
              title
              description
            }
            reason6 {
              title
              description
            }
          }
          whyinvestdogtraining {
            reason1 {
              title
              description
            }
            reason2 {
              title
              description
            }
            reason3 {
              title
              description
            }
            reason4 {
              title
              description
            }
            reason5 {
              title
              description
            }
            reason6 {
              title
              description
            }
          }
          testimonials {
            testimonial1 {
              title
              description
              image {
                ...FRAGMENT_MEDIA_ITEM
              }
            }
            testimonial2 {
              title
              description
              image {
                ...FRAGMENT_MEDIA_ITEM
              }
            }
            testimonial3 {
              title
              description
              image {
                ...FRAGMENT_MEDIA_ITEM
              }
            }
            testimonial4 {
              title
              description
              image {
                ...FRAGMENT_MEDIA_ITEM
              }
            }
            testimonial5 {
              title
              description
              image {
                ...FRAGMENT_MEDIA_ITEM
              }
            }
            testimonial6 {
              title
              description
              image {
                title
                description
                sourceUrl
              }
            }
            testimonial7 {
              title
              description
              image {
                ...FRAGMENT_MEDIA_ITEM
              }
            }
            testimonial8 {
              title
              description
              image {
                ...FRAGMENT_MEDIA_ITEM
              }
            }
          }
        }
      }
    }
  }
`;
