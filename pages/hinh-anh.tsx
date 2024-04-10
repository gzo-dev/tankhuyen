import { COURSE_PATH } from "@/paths";
import { GET_GALLERY } from "@/queries";
import prefetchData from "@/libs/prefetch";
import { addApolloState, initializeApollo } from "@/libs/apolloClient";
import { Get_GalleryQuery, Get_GalleryQueryVariables } from "@/__generated__/graphql";

import Gallery from "@/containers/Gallery";

const GalleryPage = () => {
  return <Gallery />;
};

export default GalleryPage;

export async function getServerSideProps() {
  try {
    const apolloClient = initializeApollo();

    await prefetchData(apolloClient);

    await apolloClient.query<Get_GalleryQuery, Get_GalleryQueryVariables>({
      query: GET_GALLERY,
      variables: {
        name: COURSE_PATH.gallery,
      },
    });

    return addApolloState(apolloClient, {
      props: {},
    });
  } catch {
    return {
      redirect: {
        destination: "/404",
        permanent: false,
      },
    };
  }
}
