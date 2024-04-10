import Video from "@/containers/Video";
import prefetchData from "@/libs/prefetch";
import { GET_METADATA_VIDEO, GET_VIDEOS } from "@/queries";
import { addApolloState, initializeApollo } from "@/libs/apolloClient";

const VideoPage = () => {
  return <Video />;
};

export default VideoPage;

export async function getServerSideProps() {
  try {
    const apolloClient = initializeApollo();

    await prefetchData(apolloClient);

    await Promise.all(
      [GET_METADATA_VIDEO, GET_VIDEOS].map((el) => {
        return apolloClient.query({
          query: el,
        });
      })
    );

    return addApolloState(apolloClient, {
      props: {},
      // revalidate: parseInt(process.env.NEXT_PUBLIC_DEFAULT_REVALIDATE_TIME!),
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
