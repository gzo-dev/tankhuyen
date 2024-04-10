import { gql } from "@apollo/client";

export const GET_INJECT_SCRIPT = gql`
  query GET_INJECT_SCRIPT {
    blockcodes(where: { title: "Inject Script" }) {
      nodes {
        title
        injectScript {
          appendhead
          appendbody
        }
      }
    }
  }
`;
