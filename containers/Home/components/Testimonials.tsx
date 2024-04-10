import {
  Page_Homepage_Testimonials,
  Page_Homepage_Testimonials_Testimonial1,
} from "@/__generated__/graphql";
import {
  Box,
  Container,
  Heading,
  VStack,
  Text,
  chakra,
  Flex,
  Avatar,
} from "@chakra-ui/react";

import "swiper/css";
import "swiper/css/pagination";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { BiUser } from "react-icons/bi";

const Testimonials = ({ data }: { data: Page_Homepage_Testimonials }) => {
  const results = Object.values(data).filter((el) => {
    if (typeof el === "string") return false;
    if (el?.title == null) return false;
    return true;
  }) as Page_Homepage_Testimonials_Testimonial1[];

  return (
    <Box>
      <Container maxWidth="container.md" overflow="hidden">
        <VStack paddingY={16} justifyContent="center" rowGap={16}>
          <Heading textAlign="center" className="underline">
            Khách hàng nói gì?
          </Heading>

          <StyledSwiper
            modules={[Autoplay, Pagination]}
            spaceBetween="24"
            loop
            pagination
            autoplay={{ delay: 3000, pauseOnMouseEnter: true }}
          >
            {results.map((el, idx) => {
              return (
                <SwiperSlide key={idx}>
                  <VStack
                    rowGap={4}
                    alignItems="flex-start"
                    bg="blackAlpha.50"
                    padding={8}
                    borderRadius={8}
                  >
                    <Flex alignItems="center" gap={4}>
                      {el.image ? (
                        <Avatar src={el.image?.sourceUrl!} size="lg" />
                      ) : (
                        <Avatar icon={<BiUser />} size="lg" />
                      )}
                      <Heading size="md">{el.title}</Heading>
                    </Flex>

                    <Text>{el.description}</Text>
                  </VStack>
                </SwiperSlide>
              );
            })}
          </StyledSwiper>
        </VStack>
      </Container>
    </Box>
  );
};

const StyledSwiper = chakra(Swiper, {
  baseStyle({ theme }) {
    return {
      width: "full",

      [".swiper-pagination"]: {
        top: 0,
        right: 0,
        left: "unset",
        bottom: "unset",
        display: "flex",
        flexDirection: "column",
        rowGap: 2,
        paddingTop: 4,
        paddingRight: 2,
        width: "unset",
      },
      [".swiper-pagination-bullet-active"]: {
        backgroundColor: "primary.500",
      },
    };
  },
});

export default Testimonials;
