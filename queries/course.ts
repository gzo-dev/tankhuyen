import { gql } from "@apollo/client";
import { FRAGMENT_MEDIA_ITEM, FRAGMENT_PAGE_TYPE, FRAGMENT_LINK_ITEM } from "./fragments";

const BASIC_COURSE_FRAGMENT = gql`
  ${FRAGMENT_MEDIA_ITEM}
  ${FRAGMENT_LINK_ITEM}
  fragment BASIC_COURSE_FRAGMENT on Page {
    basicCourse {
      description
      whichOneFitOnYourNeed {
        option1 {
          title
          image {
            ...FRAGMENT_MEDIA_ITEM
          }
          link {
            ...FRAGMENT_LINK_ITEM
          }
        }
        option2 {
          title
          image {
            ...FRAGMENT_MEDIA_ITEM
          }
          link {
            ...FRAGMENT_LINK_ITEM
          }
        }
        option3 {
          title
          image {
            ...FRAGMENT_MEDIA_ITEM
          }
          link {
            ...FRAGMENT_LINK_ITEM
          }
        }
        option4 {
          title
          image {
            ...FRAGMENT_MEDIA_ITEM
          }
          link {
            ...FRAGMENT_LINK_ITEM
          }
        }
        option5 {
          title
          image {
            ...FRAGMENT_MEDIA_ITEM
          }
          link {
            ...FRAGMENT_LINK_ITEM
          }
        }
        option6 {
          title
          image {
            ...FRAGMENT_MEDIA_ITEM
          }
          link {
            ...FRAGMENT_LINK_ITEM
          }
        }
        option7 {
          title
          image {
            ...FRAGMENT_MEDIA_ITEM
          }
          link {
            ...FRAGMENT_LINK_ITEM
          }
        }
        option8 {
          title
          image {
            ...FRAGMENT_MEDIA_ITEM
          }
          link {
            ...FRAGMENT_LINK_ITEM
          }
        }
        option9 {
          title
          image {
            ...FRAGMENT_MEDIA_ITEM
          }
          link {
            ...FRAGMENT_LINK_ITEM
          }
        }
        option10 {
          title
          image {
            ...FRAGMENT_MEDIA_ITEM
          }
          link {
            ...FRAGMENT_LINK_ITEM
          }
        }
        option11 {
          title
          image {
            ...FRAGMENT_MEDIA_ITEM
          }
          link {
            ...FRAGMENT_LINK_ITEM
          }
        }
        option12 {
          title
          image {
            ...FRAGMENT_MEDIA_ITEM
          }
          link {
            ...FRAGMENT_LINK_ITEM
          }
        }
      }
      courseInfo {
        description
        smallDog {
          title
          description
          price
          commands
          skills
          videos
        }
        bigDog {
          title
          description
          price
          commands
          skills
          specialSkills
          additionalSkills
          videos
        }
      }
      trainer {
        description
        image {
          ...FRAGMENT_MEDIA_ITEM
        }
        skills
        link {
          ... on Page {
            uri
          }
        }
      }
      faqs {
        faq1 {
          answer
          question
        }
        faq2 {
          answer
          question
        }
        faq3 {
          answer
          question
        }
        faq4 {
          answer
          question
        }
        faq5 {
          answer
          question
        }
        faq6 {
          answer
          question
        }
        faq7 {
          answer
          question
        }
        faq8 {
          answer
          question
        }
      }
      descriptionAtFooter
    }
  }
`;

const PROFESSIONAL_COURSE_FRAGMENT = gql`
  ${FRAGMENT_MEDIA_ITEM}
  ${FRAGMENT_LINK_ITEM}
  fragment PROFESSIONAL_COURSE_FRAGMENT on Page {
    professionalCourse {
      description
      whichOneFitOnYourNeed {
        option1 {
          title
          image {
            ...FRAGMENT_MEDIA_ITEM
          }
          link {
            ...FRAGMENT_LINK_ITEM
          }
        }
        option2 {
          title
          image {
            ...FRAGMENT_MEDIA_ITEM
          }
          link {
            ...FRAGMENT_LINK_ITEM
          }
        }
        option3 {
          title
          image {
            ...FRAGMENT_MEDIA_ITEM
          }
          link {
            ...FRAGMENT_LINK_ITEM
          }
        }
        option4 {
          title
          image {
            ...FRAGMENT_MEDIA_ITEM
          }
          link {
            ...FRAGMENT_LINK_ITEM
          }
        }
        option5 {
          title
          image {
            ...FRAGMENT_MEDIA_ITEM
          }
          link {
            ...FRAGMENT_LINK_ITEM
          }
        }
        option6 {
          title
          image {
            ...FRAGMENT_MEDIA_ITEM
          }
          link {
            ...FRAGMENT_LINK_ITEM
          }
        }
        option7 {
          title
          image {
            ...FRAGMENT_MEDIA_ITEM
          }
          link {
            ...FRAGMENT_LINK_ITEM
          }
        }
        option8 {
          title
          image {
            ...FRAGMENT_MEDIA_ITEM
          }
          link {
            ...FRAGMENT_LINK_ITEM
          }
        }
      }
      courseInfo {
        description
        professionalDog {
          title
          description
          price
          commands
          skills
          trainningMethods
          videos
        }
      }
      trainer {
        description
        image {
          ...FRAGMENT_MEDIA_ITEM
        }
        skills
        link {
          ... on Page {
            uri
          }
        }
      }
      faqs {
        faq1 {
          answer
          question
        }
        faq2 {
          answer
          question
        }
        faq3 {
          answer
          question
        }
        faq4 {
          answer
          question
        }
        faq5 {
          answer
          question
        }
        faq6 {
          answer
          question
        }
        faq7 {
          answer
          question
        }
        faq8 {
          answer
          question
        }
      }
      descriptionAtFooter
    }
  }
`;

const VETERIANRY_FRAGMENT = gql`
  ${FRAGMENT_MEDIA_ITEM}
  fragment VETERIANRY_FRAGMENT on Page {
    veterinary {
      description
      whatWeUse
      caution
      procedure
      schedulingForDeworming
      faqs {
        faq1 {
          question
          answer
        }
        faq2 {
          question
          answer
        }
        faq3 {
          question
          answer
        }
        faq4 {
          question
          answer
        }
        faq5 {
          question
          answer
        }
        faq6 {
          question
          answer
        }
        faq7 {
          question
          answer
        }
        faq8 {
          question
          answer
        }
      }
      reasons {
        description
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
      }
      whyPetShouldDeworming {
        description
        reason1 {
          question
          answer
        }
        reason2 {
          question
          answer
        }
        reason3 {
          question
          answer
        }
        reason4 {
          question
          answer
        }
      }
    }
  }
`;

const PET_CARE_FRAGMENT = gql`
  ${FRAGMENT_MEDIA_ITEM}
  fragment PET_CARE_FRAGMENT on Page {
    petCare {
      description
      whyChooseUs {
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
        reason7 {
          title
          description
        }
        reason8 {
          title
          description
        }
      }
      procedure
      faqs {
        faq1 {
          question
          answer
        }
        faq2 {
          question
          answer
        }
        faq3 {
          question
          answer
        }
        faq4 {
          question
          answer
        }
        faq5 {
          question
          answer
        }
        faq6 {
          question
          answer
        }
        faq7 {
          question
          answer
        }
        faq8 {
          question
          answer
        }
      }
      descriptionAtFooter
    }
  }
`;

const GROOMING_FRAGMENT = gql`
  fragment GROOMING_FRAGMENT on Page {
    grooming {
      description
      whyWeShouldUseGrooming
      procedure {
        description
        normalDog {
          step1 {
            title
            description
          }
          step2 {
            title
            description
          }
          step3 {
            title
            description
          }
          step4 {
            title
            description
          }
          step5 {
            title
            description
          }
          step6 {
            title
            description
          }
          step7 {
            title
            description
          }
          step8 {
            title
            description
          }
          step9 {
            title
            description
          }
          step10 {
            title
            description
          }
        }
        unnormalDog {
          beforeNote
          afterNote
          step1 {
            title
            description
          }
          step2 {
            title
            description
          }
          step3 {
            title
            description
          }
          step4 {
            title
            description
          }
          step5 {
            title
            description
          }
          step6 {
            title
            description
          }
          step7 {
            title
            description
          }
          step8 {
            title
            description
          }
          step9 {
            title
            description
          }
          step10 {
            title
            description
          }
        }
      }
      faqs {
        faq1 {
          question
          answer
        }
        faq2 {
          question
          answer
        }
        faq3 {
          question
          answer
        }
        faq4 {
          question
          answer
        }
        faq5 {
          question
          answer
        }
        faq6 {
          question
          answer
        }
        faq7 {
          question
          answer
        }
        faq8 {
          question
          answer
        }
      }
      images
      descriptionAtFooter
    }
  }
`;

const INSEMINATION_FRAGMENT = gql`
  fragment INSEMINATION_FRAGMENT on Page {
    insemination {
      description
      whyChooseUs
      procedure {
        step1 {
          title
          description
        }
        step2 {
          title
          description
        }
        step3 {
          title
          description
        }
        step4 {
          title
          description
        }
        step5 {
          title
          description
        }
        step6 {
          title
          description
        }
      }
      faqs {
        faq1 {
          question
          answer
        }
        faq2 {
          question
          answer
        }
        faq3 {
          question
          answer
        }
        faq4 {
          question
          answer
        }
        faq5 {
          question
          answer
        }
        faq6 {
          question
          answer
        }
      }
      videos
      descriptionAtFooter
    }
  }
`;

const SELLING_DOG_FRAGMENT = gql`
  fragment SELLING_DOG_FRAGMENT on Page {
    sellingDog {
      description
      whyChooseUs {
        description
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
      }
    }
  }
`;

export const GET_BASIC_COURSE = gql`
  ${FRAGMENT_PAGE_TYPE}
  ${BASIC_COURSE_FRAGMENT}
  query GET_BASIC_COURSE($name: String!) {
    pages(where: { name: $name }) {
      nodes {
        ...FRAGMENT_PAGE_TYPE
        ...BASIC_COURSE_FRAGMENT
      }
    }
  }
`;

export const GET_PROFESSIONAL_COURSE = gql`
  ${FRAGMENT_PAGE_TYPE}
  ${PROFESSIONAL_COURSE_FRAGMENT}
  query GET_PROFESSIONAL_COURSE($name: String!) {
    pages(where: { name: $name }) {
      nodes {
        ...FRAGMENT_PAGE_TYPE
        ...PROFESSIONAL_COURSE_FRAGMENT
      }
    }
  }
`;

export const GET_VETERINARY = gql`
  ${FRAGMENT_PAGE_TYPE}
  ${VETERIANRY_FRAGMENT}
  query GET_VETERINARY($name: String!) {
    pages(where: { name: $name }) {
      nodes {
        ...FRAGMENT_PAGE_TYPE
        ...VETERIANRY_FRAGMENT
      }
    }
  }
`;

export const GET_PET_CARE = gql`
  ${FRAGMENT_PAGE_TYPE}
  ${PET_CARE_FRAGMENT}
  query GET_PET_CARE($name: String!) {
    pages(where: { name: $name }) {
      nodes {
        ...FRAGMENT_PAGE_TYPE
        ...PET_CARE_FRAGMENT
      }
    }
  }
`;

export const GET_GROOMING = gql`
  ${FRAGMENT_PAGE_TYPE}
  ${GROOMING_FRAGMENT}
  query GET_GROOMING($name: String!) {
    pages(where: { name: $name }) {
      nodes {
        ...FRAGMENT_PAGE_TYPE
        ...GROOMING_FRAGMENT
      }
    }
  }
`;

export const GET_INSEMINATION = gql`
  ${FRAGMENT_PAGE_TYPE}
  ${INSEMINATION_FRAGMENT}
  query GET_INSEMINATION($name: String!) {
    pages(where: { name: $name }) {
      nodes {
        ...FRAGMENT_PAGE_TYPE
        ...INSEMINATION_FRAGMENT
      }
    }
  }
`;

export const GET_SELLING_DOG = gql`
  ${FRAGMENT_PAGE_TYPE}
  ${SELLING_DOG_FRAGMENT}
  query GET_SELLING_DOG($name: String!) {
    pages(where: { name: $name }) {
      nodes {
        ...FRAGMENT_PAGE_TYPE
        ...SELLING_DOG_FRAGMENT
      }
    }
  }
`;
