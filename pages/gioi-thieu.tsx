import { GET_ABOUT_US } from "@/queries";
import prefetchData from "@/libs/prefetch";
import AboutUs from "@/containers/About/AboutUs";
import { addApolloState, initializeApollo } from "@/libs/apolloClient";
import { Get_About_UsQuery, Get_About_UsQueryVariables } from "@/__generated__/graphql";

const AboutUsPage = () => {
  return <AboutUs />;
};

export default AboutUsPage;

export async function getServerSideProps() {
  try {
    const apolloClient = initializeApollo();

    await prefetchData(apolloClient);

    await apolloClient.query<Get_About_UsQuery, Get_About_UsQueryVariables>({
      query: GET_ABOUT_US,
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
