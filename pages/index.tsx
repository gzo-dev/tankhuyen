import { GET_HOME_PAGE } from "@/queries";
import { addApolloState, initializeApollo } from "@/libs/apolloClient";

import prefetchData from "@/libs/prefetch";
import Home from "@/containers/Home/Home";

export default function HomePage() {
  return <Home />;
}

export async function getServerSideProps() {
  try {
    const apolloClient = initializeApollo();

    await prefetchData(apolloClient);

    await apolloClient.query({
      query: GET_HOME_PAGE,
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

// export async function getStaticProps() {
//   try {
//     const apolloClient = initializeApollo();

//     await prefetchData(apolloClient);

//     await apolloClient.query({
//       query: GET_HOME_PAGE,
//     });

//     return addApolloState(apolloClient, {
//       props: {},
//       revalidate: parseInt(process.env.NEXT_PUBLIC_DEFAULT_REVALIDATE_TIME!),
//     } as GetStaticPropsResult<any>);
//   } catch {
//     return {
//       redirect: {
//         destination: "/404",
//         permanent: true,
//       },
//     };
//   }
// }
