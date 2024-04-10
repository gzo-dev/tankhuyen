import prefetchData from "@/libs/prefetch";
import Contact from "@/containers/Contact/Contact";
import { addApolloState, initializeApollo } from "@/libs/apolloClient";

const ContactPage = () => {
  return <Contact />;
};

export default ContactPage;

export async function getServerSideProps() {
  try {
    const apolloClient = initializeApollo();

    await prefetchData(apolloClient);

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
