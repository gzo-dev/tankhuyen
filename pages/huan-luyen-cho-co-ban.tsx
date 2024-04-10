import prefetchData from "@/libs/prefetch";
import BasicCourse from "@/containers/Services/BasicCourse";
import { addApolloState, initializeApollo } from "@/libs/apolloClient";
import { GET_BASIC_COURSE } from "@/queries";
import { COURSE_PATH } from "@/paths";
import {
  Get_Basic_CourseQuery,
  Get_Basic_CourseQueryVariables,
} from "@/__generated__/graphql";

const BasicCoursePage = () => {
  return <BasicCourse />;
};

export default BasicCoursePage;

export async function getServerSideProps() {
  try {
    const apolloClient = initializeApollo();

    await prefetchData(apolloClient);

    await apolloClient.query<Get_Basic_CourseQuery, Get_Basic_CourseQueryVariables>({
      query: GET_BASIC_COURSE,
      variables: {
        name: COURSE_PATH.basic_course,
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
