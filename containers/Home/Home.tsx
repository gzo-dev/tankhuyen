import dynamic from "next/dynamic";
import React, { Fragment } from "react";
import { GET_HOME_PAGE } from "@/queries";
import { useQuery } from "@apollo/client";
import { Container, Flex, Spinner, chakra } from "@chakra-ui/react";

import { get } from "lodash";
import Services from "./components/Services";
import {
  Home_PageQuery,
  Page_Homepage,
  Fragment_Page_TypeFragment,
} from "@/__generated__/graphql";
import Goal from "./components/Goal";
import WhyChooseUs from "./components/WhyChooseUs";
import WhyInvestDogTraining from "./components/WhyInvestDogTraining";
import Testimonials from "./components/Testimonials";
import SEO from "@/hocs/SEO";
import PageSkeleton from "@/components/PageSkeleton";
import WrapperMainContent from "@/components/WrapperMainContent";

const DynamicSlider = dynamic(() => import("./components/Slider"), {});

const Home = () => {
  const { data } = useQuery<Home_PageQuery>(GET_HOME_PAGE);

  if (data == undefined) {
    return (
      <WrapperMainContent>
        <Container>
          <PageSkeleton />
        </Container>
      </WrapperMainContent>
    );
  }

  const homePage = get(data, "pages.nodes[0].homePage") as Page_Homepage | undefined;

  const seoContent = get(data, "pages.nodes[0]") as
    | Fragment_Page_TypeFragment
    | undefined;

  const { sliders, services, goal, whychooseus, whyinvestdogtraining, testimonials } =
    homePage || {};

  return (
    <Fragment>
      <SEO data={seoContent} />
      <CustomContainer>
        <DynamicSlider data={sliders!} />
      </CustomContainer>
      <Container>
        <Services data={services!} />
      </Container>
      <Goal data={goal!} />
      <Container>
        <WhyChooseUs data={whychooseus!} />
      </Container>
      <WhyInvestDogTraining data={whyinvestdogtraining!} />
      <Container>
        <Testimonials data={testimonials!} />
      </Container>
    </Fragment>
  );
};

const CustomContainer = chakra(Container, {
  baseStyle({ theme }) {
    return {
      maxWidth: "100vw",
      paddingX: 0,
      ["@media screen and (min-width: 1920px)"]: {
        maxWidth: theme.breakpoints["2xl"],
      },
    };
  },
});

export default Home;
