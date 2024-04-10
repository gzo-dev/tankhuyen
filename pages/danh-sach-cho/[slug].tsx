import { GetServerSidePropsContext } from "next";

import prefetchData from "@/libs/prefetch";
import DogDetail from "@/containers/DogDetail";
import { addApolloState, initializeApollo } from "@/libs/apolloClient";
import { GET_DETAIL_DOG } from "@/queries/dog";
import {
  Get_Detail_DogQuery,
  Get_Detail_DogQueryVariables,
} from "@/__generated__/graphql";

const DogDetailPage = () => {
  return <DogDetail />;
};

export default DogDetailPage;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { params = {} } = context;

  try {
    if (!params.slug) throw new Error("Not Found Params");

    const apolloClient = initializeApollo();

    await prefetchData(apolloClient);

    await apolloClient.query<Get_Detail_DogQuery, Get_Detail_DogQueryVariables>({
      query: GET_DETAIL_DOG,
      variables: {
        search: (params.slug! as string).replaceAll(/-/g, " "),
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

// export async function getStaticPaths() {
//   return {
//     paths: [],
//     fallback: true,
//   };
// }
