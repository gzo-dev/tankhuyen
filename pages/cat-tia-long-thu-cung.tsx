import { COURSE_PATH } from "@/paths";
import { GET_GROOMING } from "@/queries";
import prefetchData from "@/libs/prefetch";
import Grooming from "@/containers/Services/Grooming";
import { addApolloState, initializeApollo } from "@/libs/apolloClient";
import { Get_GroomingQuery, Get_GroomingQueryVariables } from "@/__generated__/graphql";

const GroomingPage = () => {
  return <Grooming />;
};

export default GroomingPage;

export async function getServerSideProps() {
  try {
    const apolloClient = initializeApollo();

    await prefetchData(apolloClient);

    await apolloClient.query<Get_GroomingQuery, Get_GroomingQueryVariables>({
      query: GET_GROOMING,
      variables: {
        name: COURSE_PATH.grooming,
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
