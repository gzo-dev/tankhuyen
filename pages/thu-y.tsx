import prefetchData from "@/libs/prefetch";
import { addApolloState, initializeApollo } from "@/libs/apolloClient";
import { GET_VETERINARY } from "@/queries";
import { COURSE_PATH } from "@/paths";
import {
  Get_VeterinaryQuery,
  Get_VeterinaryQueryVariables,
} from "@/__generated__/graphql";
import Veterinary from "@/containers/Services/Veterinary";

const VeterinaryPage = () => {
  return <Veterinary />;
};

export default VeterinaryPage;

export async function getServerSideProps() {
  try {
    const apolloClient = initializeApollo();

    await prefetchData(apolloClient);

    await apolloClient.query<Get_VeterinaryQuery, Get_VeterinaryQueryVariables>({
      query: GET_VETERINARY,
      variables: {
        name: COURSE_PATH.veterinary,
      },
    });

    return addApolloState(apolloClient, {
      props: {},
    });
  } catch {
    return {
      redirect: {
        destination: "/404",
        permanent: true,
      },
    };
  }
}
