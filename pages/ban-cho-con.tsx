import {
  Get_DogsQuery,
  Get_Selling_DogQuery,
  Get_Selling_DogQueryVariables,
} from "@/__generated__/graphql";
import { COURSE_PATH } from "@/paths";
import prefetchData from "@/libs/prefetch";
import { GET_SELLING_DOG } from "@/queries";
import Selling from "@/containers/Services/Selling";
import { addApolloState, initializeApollo } from "@/libs/apolloClient";
import { GET_DOGS } from "@/queries/dog";

const SellingDogPage = () => {
  return <Selling />;
};

export default SellingDogPage;

export async function getServerSideProps() {
  try {
    const apolloClient = initializeApollo();

    await prefetchData(apolloClient);

    await Promise.all([
      apolloClient.query<Get_DogsQuery, Get_Selling_DogQueryVariables>({
        query: GET_DOGS,
      }),
      apolloClient.query<Get_Selling_DogQuery, Get_Selling_DogQueryVariables>({
        query: GET_SELLING_DOG,
        variables: {
          name: COURSE_PATH.selling_dog,
        },
      }),
    ]);

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
