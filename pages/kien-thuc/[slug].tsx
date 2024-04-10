import BlogDetail from "@/containers/Blog/BlogDetail";
import { GetServerSidePropsContext } from "next";
import { addApolloState, initializeApollo } from "@/libs/apolloClient";

import prefetchData from "@/libs/prefetch";
import { GET_BLOG_DETAIL } from "@/queries";
import {
  Get_Blog_DetailQuery,
  Get_Blog_DetailQueryVariables,
} from "@/__generated__/graphql";

const DetailBlog = () => {
  return <BlogDetail />;
};

export default DetailBlog;

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { params = {} } = context;

  try {
    if (!params.slug) throw new Error("Not Found Params");

    const apolloClient = initializeApollo();

    await prefetchData(apolloClient);

    await apolloClient.query<Get_Blog_DetailQuery, Get_Blog_DetailQueryVariables>({
      query: GET_BLOG_DETAIL,
      variables: {
        name: params.slug as string,
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
