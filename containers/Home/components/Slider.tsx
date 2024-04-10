import { Box, chakra } from "@chakra-ui/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

import Image from "@/components/Image";
import { MediaItem, Page_Homepage_Sliders } from "@/__generated__/graphql";

const Slider = ({ data }: { data: Page_Homepage_Sliders }) => {
  const results = Object.values(data).filter((el) => {
    return el !== null && typeof el !== "string";
  }) as MediaItem[];

  return (
    <StyledSwiper
      modules={[Navigation, Autoplay]}
      spaceBetween="24"
      navigation
      loop
      autoplay={{ delay: 3000, pauseOnMouseEnter: true }}
    >
      {results.map((el) => {
        return (
          <SwiperSlide key={el.sourceUrl!}>
            <Box aspectRatio={16 / 9}>
              <Image src={el.sourceUrl!} alt={el.altText!} aspectRatio={16 / 9} />
            </Box>
          </SwiperSlide>
        );
      })}
    </StyledSwiper>
  );
};

const StyledSwiper = chakra(Swiper, {
  baseStyle({ theme }) {
    return {
      ["& .swiper-button-prev, & .swiper-button-next"]: {
        color: theme.colors.primary[600],
        opacity: 0,
      },

      "&:hover .swiper-button-prev, &:hover .swiper-button-next": {
        opacity: 1,
        transition: "200ms",
      },
    };
  },
});

export default Slider;
