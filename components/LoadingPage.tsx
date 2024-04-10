import { Fragment } from "react";
import Script from "next/script";
import { Box, chakra, keyframes } from "@chakra-ui/react";

const LoadingPage = () => {
  return (
    <Fragment>
      <StyledLoadingContainer
        position="fixed"
        zIndex={9999}
        top={0}
        left={0}
        width="100vw"
        height="100vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
        background="white"
        className="loading-screen"
      >
        <StyledLoading className="dots-5" />
      </StyledLoadingContainer>
      <Script id="loading-page" strategy="lazyOnload">
        {`
        document.querySelector(".loading-screen")?.classList?.add("done");
        document.body.classList.remove("disable-scroll");
        setTimeout(() => {document.querySelector(".loading-screen")?.remove()}, 5000)
        `}
      </Script>
    </Fragment>
  );
};

const FOREGOUND_COLOR = "#33a5fe";
const BACKGROUND_COLOR = "#d9f1ff";
const DISTANCE = "24px";

const animation = keyframes`
    0%  {box-shadow: ${DISTANCE} 0 ${FOREGOUND_COLOR}, -${DISTANCE} 0 ${BACKGROUND_COLOR};background: ${FOREGOUND_COLOR} }
    33% {box-shadow: ${DISTANCE} 0 ${FOREGOUND_COLOR}, -${DISTANCE} 0 ${BACKGROUND_COLOR};background: ${BACKGROUND_COLOR}}
    66% {box-shadow: ${DISTANCE} 0 ${BACKGROUND_COLOR},-${DISTANCE} 0 ${FOREGOUND_COLOR}; background: ${BACKGROUND_COLOR}}
    100%{box-shadow: ${DISTANCE} 0 ${BACKGROUND_COLOR},-${DISTANCE} 0 ${FOREGOUND_COLOR}; background: ${FOREGOUND_COLOR} }
`;

const StyledLoadingContainer = chakra(Box, {
  baseStyle(props) {
    return {
      transition: "all 1000ms",
      "&.done": {
        opacity: 0,
        visibility: "hidden",
      },
    };
  },
});

const StyledLoading = chakra(Box, {
  baseStyle() {
    return {
      width: 4,
      aspectRatio: 1,
      borderRadius: "50%",
      animation: `${animation} 1s infinite linear alternate`,
    };
  },
});

export default LoadingPage;
