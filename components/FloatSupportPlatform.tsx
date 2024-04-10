import { useToggle } from "react-use";
import { useQuery } from "@apollo/client";
import { Box, IconButton, VStack, chakra } from "@chakra-ui/react";

import { SiZalo, SiFacebook } from "react-icons/si";
import { BiSupport, BiX, BiPhone } from "react-icons/bi";

import { GET_GENERAL_INFO } from "@/queries";
import { Get_General_InfoQuery } from "@/__generated__/graphql";
import { MouseEvent, useCallback } from "react";

const FloatSupportPlatform = () => {
  const [isOpen, toggleIsOpen] = useToggle(false);

  const { data } = useQuery<Get_General_InfoQuery>(GET_GENERAL_INFO);

  const generalInfo = data?.blockcodes?.nodes?.[0]?.generalInfo || {};

  const { facebook, hotline, zalo } = generalInfo;

  const onClickSupportHandler = useCallback((e: MouseEvent<HTMLButtonElement>) => {
    let link = e.currentTarget.dataset.link as string | undefined;
    const platform = e.currentTarget.dataset.platform as string | undefined;

    if (link == undefined) return;

    link = link.replaceAll(" ", "");

    if (link.includes("http")) {
      window.open(link, "_blank");
    } else {
      if (platform === "phone") {
        window.open(`tel:${link}`, "_self");
      } else if (platform === "zalo") {
        window.open(`https://zalo.me/${link}`, "_blank");
      }
    }
  }, []);

  return (
    <Box position="fixed" zIndex="sticky" bottom={{ base: 20, md: 24, lg: 32 }} right={2}>
      <VStack gap={4}>
        {facebook && (
          <StyledIconButton
            className={`support-item ${isOpen ? "active" : ""}`}
            aria-label="Facebook Support"
            icon={<SiFacebook />}
            size="lg"
            data-link={facebook}
            data-platform="facebook"
            onClick={onClickSupportHandler}
          />
        )}
        {zalo && (
          <StyledIconButton
            className={`support-item ${isOpen ? "active" : ""}`}
            aria-label="Zalo Support"
            icon={<SiZalo />}
            size="lg"
            data-link={zalo}
            data-platform="zalo"
            onClick={onClickSupportHandler}
          />
        )}

        {hotline && (
          <StyledIconButton
            className={`support-item ${isOpen ? "active" : ""}`}
            aria-label="Hotline Support"
            icon={<BiPhone />}
            size="lg"
            data-link={hotline}
            data-platform="phone"
            onClick={onClickSupportHandler}
          />
        )}
        <StyledIconButton
          aria-label="Support"
          size="lg"
          icon={isOpen ? <BiX /> : <BiSupport />}
          onClick={toggleIsOpen}
        />
      </VStack>
    </Box>
  );
};

export default FloatSupportPlatform;

const StyledIconButton = chakra(IconButton, {
  baseStyle() {
    return {
      size: "lg",
      bgColor: "white",
      color: "primary.500",
      boxShadow: "md",
      fontSize: {
        base: 20,
        md: 24,
      },
      transition: "300ms all",

      _hover: {
        bgColor: "white",
        color: "primary.300",
      },
      _active: {
        bgColor: "white",
        color: "primary.300",
        opacity: 0.9,
      },
      "&.support-item": {
        opacity: 0,
        visibility: "hidden",
      },

      "&.support-item.active": {
        opacity: 1,
        visibility: "visible",
      },
    };
  },
});
