import { COURSE_PATH } from "@/paths";
import prefetchData from "@/libs/prefetch";
import { GET_INSEMINATION } from "@/queries";
import Insemination from "@/containers/Services/Insemination";
import { addApolloState, initializeApollo } from "@/libs/apolloClient";
import {
  Get_InseminationQuery,
  Get_InseminationQueryVariables,
} from "@/__generated__/graphql";

const InseminationPage = () => {
  return <Insemination />;
};

export default InseminationPage;

export async function getServerSideProps() {
  try {
    const apolloClient = initializeApollo();

    await prefetchData(apolloClient);

    await apolloClient.query<Get_InseminationQuery, Get_InseminationQueryVariables>({
      query: GET_INSEMINATION,
      variables: {
        name: COURSE_PATH.insemination,
      },
    });

    return addApolloState(apolloClient, {
      props: {},
      // revalidate: parseInt(process.env.NEXT_PUBLIC_DEFAULT_REVALIDATE_TIME!),
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
