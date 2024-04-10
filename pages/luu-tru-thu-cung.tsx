import { COURSE_PATH } from "@/paths";
import { GET_PET_CARE } from "@/queries";
import prefetchData from "@/libs/prefetch";
import PetCare from "@/containers/Services/PetCare";
import { addApolloState, initializeApollo } from "@/libs/apolloClient";
import { Get_Pet_CareQuery, Get_Pet_CareQueryVariables } from "@/__generated__/graphql";

const PetCarePage = () => {
  return <PetCare />;
};

export default PetCarePage;

export async function getServerSideProps() {
  try {
    const apolloClient = initializeApollo();

    await prefetchData(apolloClient);

    await apolloClient.query<Get_Pet_CareQuery, Get_Pet_CareQueryVariables>({
      query: GET_PET_CARE,
      variables: {
        name: COURSE_PATH.pet_care,
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
