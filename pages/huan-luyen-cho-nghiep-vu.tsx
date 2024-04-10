
import { COURSE_PATH } from "@/paths";
import { GET_PROFESSIONAL_COURSE } from "@/queries";
import prefetchData from "@/libs/prefetch";
import { addApolloState, initializeApollo } from "@/libs/apolloClient";
import ProfessionalCourse from "@/containers/Services/ProfessionalCourse";
import {
  Get_Professional_CourseQuery,
  Get_Professional_CourseQueryVariables,
} from "@/__generated__/graphql";

const ProfessionalCoursePage = () => {
  return <ProfessionalCourse />;
};

export default ProfessionalCoursePage;

export async function getServerSideProps() {
  try {
    const apolloClient = initializeApollo();

    await prefetchData(apolloClient);

    await apolloClient.query<
      Get_Professional_CourseQuery,
      Get_Professional_CourseQueryVariables
    >({
      query: GET_PROFESSIONAL_COURSE,
      variables: {
        name: COURSE_PATH.professional_course,
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
