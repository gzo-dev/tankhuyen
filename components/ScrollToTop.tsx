import { useEvent } from "react-use";
import { useCallback, useRef } from "react";
import { BiUpArrowAlt } from "react-icons/bi";
import { Flex, Icon, IconButton, chakra } from "@chakra-ui/react";

const ScrollToTop = () => {
  const ref = useRef<HTMLDivElement | null>();

  const onScrollTopHandler = useCallback(() => {
    window.scrollTo({ top: 0 });
  }, []);

  const cb = useCallback((e: WheelEvent) => {
    if (window.scrollY > 600 && !ref.current?.classList.contains("active")) {
      ref.current?.classList.add("active");
    } else if (window.scrollY < 400 && ref.current?.classList.contains("active")) {
      ref.current?.classList.remove("active");
    }
  }, []);

  useEvent("scroll", cb);

  return (
    <StyledFlex
      position="fixed"
      bottom={{ base: 4, md: 6, lg: 8 }}
      right={{ base: 4, md: 6, lg: 8 }}
      borderRadius={{ base: 4, md: 8 }}
      zIndex="sticky"
      ref={(instanceRef: HTMLDivElement) => {
        ref.current = instanceRef;
      }}
      boxShadow="md"
    >
      <IconButton
        bgColor="primary.500"
        aria-label="Scroll to top"
        fontSize={{ base: 20, md: 24 }}
        size="lg"
        onClick={onScrollTopHandler}
        icon={<BiUpArrowAlt />}
      />
    </StyledFlex>
  );
};

const StyledFlex = chakra(Flex, {
  baseStyle() {
    return {
      transform: "translateY(200px)",
      transition: "all 500ms",
      "&.active": {
        transform: "translateY(0)",
      },
    };
  },
});

export default ScrollToTop;
