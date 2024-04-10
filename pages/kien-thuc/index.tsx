import BlogList from "@/containers/Blog/BlogList";
import { initializeApollo, addApolloState } from "@/libs/apolloClient";
import prefetchData from "@/libs/prefetch";
import { GET_BLOG_LIST } from "@/queries";
import {
  Get_Blog_ListQuery,
  Get_Blog_ListQueryVariables,
  OrderEnum,
} from "@/__generated__/graphql";

const BlogListPage = () => {
  return <BlogList />;
};

export default BlogListPage;

export async function getServerSideProps() {
  try {
    const apolloClient = initializeApollo();

    await prefetchData(apolloClient);

    await apolloClient.query<Get_Blog_ListQuery, Get_Blog_ListQueryVariables>({
      query: GET_BLOG_LIST,
      variables: {
        orderBy: OrderEnum.Desc,
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
