import { useToggle } from "react-use";
import { useRouter } from "next/router";
import Hamburger from "hamburger-react";
import { useQuery } from "@apollo/client";
import { useMemo, Fragment, useRef, useCallback, FormEvent, useEffect } from "react";
import { BiChevronDown, BiSearch } from "react-icons/bi";

import { get, set } from "lodash";
import NextLink from "next/link";

import {
  Box,
  Flex,
  Icon,
  Input,
  Link,
  Drawer,
  useTheme,
  Container,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  InputGroup,
  InputRightElement,
  chakra,
} from "@chakra-ui/react";

import Image from "@/components/Image";
import { GET_GENERAL_INFO, GET_NAVIGATION } from "@/queries";
import {
  MenuItem,
  Blockcode_Generalinfo,
  Get_NavigationQuery,
  Get_General_InfoQuery,
} from "@/__generated__/graphql";

interface ExtendMenuItem extends MenuItem {
  children: ExtendMenuItem[];
}

const Header = () => {
  const containerRef = useRef<HTMLDivElement | null>();

  // const cb = useCallback((e: WheelEvent) => {
  //   if (window.scrollY > 600 && !containerRef.current?.classList.contains("active")) {
  //     containerRef.current?.classList.add("active");
  //   } else if (
  //     window.scrollY < 400 &&
  //     containerRef.current?.classList.contains("active")
  //   ) {
  //     containerRef.current?.classList.remove("active");
  //   }
  // }, []);

  // useEvent("scroll", cb);

  return (
    <Wrapper
      ref={(instanceRef: HTMLDivElement) => {
        containerRef.current = instanceRef;
      }}
      paddingY={{ base: 2, lg: 4 }}
      position="sticky"
      top={0}
      backgroundColor="white"
      zIndex="sticky"
      boxShadow="lg"
    >
      <Container>
        <HeaderOnMobileAndTablet />
        <HeaderOnDesktop />
      </Container>
    </Wrapper>
  );
};

const Wrapper = chakra(Box, {
  baseStyle(props) {
    return {
      transition: "padding 300ms",
      "&.active": {
        paddingY: 0,
      },
    };
  },
});

const HeaderOnMobileAndTablet = () => {
  const theme = useTheme();
  const elementRef = useRef<object>({});
  const inputRef = useRef<HTMLInputElement | null>();
  const router = useRouter();

  const [isOpen, toggleOpen] = useToggle(false);
  const { data: navigationData } = useQuery<Get_NavigationQuery>(GET_NAVIGATION);
  const { data: generalInfoData } = useQuery<Get_General_InfoQuery>(GET_GENERAL_INFO);

  useEffect(() => {
    const handleRouteChange = () => {
      toggleOpen(false);
    };

    router.events.on("routeChangeStart", handleRouteChange);

    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
    };
  }, [router, toggleOpen]);

  const menuItems = useMemo(() => {
    if (navigationData == undefined) return null;

    const tree = [] as ExtendMenuItem[];

    const flatTree: any = {};

    navigationData.menuItems?.edges.forEach((el) => {
      const newItem = { ...el.node } as ExtendMenuItem;

      const { id, parentId } = newItem;

      flatTree[id] = flatTree[id] || [];

      newItem["children"] = flatTree[id];

      parentId
        ? (flatTree[parentId] = flatTree[parentId] || []).push(newItem)
        : tree.push(newItem);
    })!;

    function recursiveRender(tree: ExtendMenuItem[], level: number) {
      if (tree.length === 0) return;

      return tree.map((el) => {
        return (
          <Flex
            position="relative"
            paddingLeft={4}
            paddingY={3}
            key={el.id}
            flexDirection="column"
            alignItems="flex-start"
            justifyContent="space-between"
          >
            <Flex
              flex={1}
              width="100%"
              alignItems="center"
              justifyContent="space-between"
              _active={{ color: theme.colors.primary[500] }}
              cursor={el.children.length === 0 ? "auto" : "pointer"}
              onClick={() => {
                if (el.children.length === 0) return;

                const targetEl = get(elementRef.current, `sub-menu-${level + 1}`) as
                  | HTMLDivElement
                  | undefined;

                const subTargetEl = get(
                  elementRef.current,
                  `sub-menu-inner-${level + 1}`
                ) as HTMLDivElement | undefined;

                const rootSubMenu = get(elementRef.current, `sub-menu-1`) as
                  | HTMLDivElement
                  | undefined;

                const measuringWrapper = get(elementRef.current, `sub-menu-inner-1`) as
                  | HTMLDivElement
                  | undefined;

                if (
                  targetEl == undefined ||
                  subTargetEl == undefined ||
                  rootSubMenu == undefined ||
                  measuringWrapper == undefined
                )
                  return;

                if (targetEl.classList.contains("active")) {
                  targetEl.classList.remove("active");

                  if (rootSubMenu === targetEl) {
                    targetEl.style.height = `0px`;
                  } else {
                    targetEl.style.height = `0px`;
                    rootSubMenu.style.height = `${
                      measuringWrapper.clientHeight - subTargetEl.clientHeight
                    }px`;
                  }
                } else {
                  targetEl.classList.add("active");

                  if (rootSubMenu === targetEl) {
                    targetEl.style.height = `${subTargetEl.clientHeight}px`;
                  } else {
                    targetEl.style.height = `${subTargetEl.clientHeight}px`;
                    rootSubMenu.style.height = `${
                      measuringWrapper.clientHeight + subTargetEl.clientHeight
                    }px`;
                  }
                }
              }}
            >
              <Link
                as={NextLink}
                href={el.path!}
                fontWeight="semibold"
                textDecoration="none"
                _hover={{ textDecoration: "none" }}
                whiteSpace="nowrap"
                sx={{
                  ".sub-menu &": {
                    fontSize: "sm",
                  },
                }}
              >
                {el.label}
              </Link>
              {el.children.length ? <Icon as={BiChevronDown} marginLeft={2} /> : null}
            </Flex>
            {el.children.length ? (
              <Flex
                className={`sub-menu sub-menu-${level + 1}`}
                width="100%"
                overflow="hidden"
                height={0}
                transition="height 700ms"
                flexDirection="column"
                ref={(instanceRef) => {
                  set(elementRef.current, `sub-menu-${level + 1}`, instanceRef);
                }}
              >
                <Flex
                  flexDirection="column"
                  className={`sub-menu-inner-${level + 1}`}
                  ref={(instanceRef) => {
                    set(elementRef.current, `sub-menu-inner-${level + 1}`, instanceRef);
                  }}
                >
                  {recursiveRender(el.children, level + 1)}
                </Flex>
              </Flex>
            ) : null}
          </Flex>
        );
      });
    }

    const result = recursiveRender(tree, 0);

    return <Fragment>{result}</Fragment>;
  }, [navigationData, theme]);

  const onSendRequestHandler = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      router.push(`/tim-kiem?search=${inputRef.current?.value}`);

      if (inputRef.current) {
        inputRef.current.value = "";
        inputRef.current.blur();
      }
    },
    [router]
  );

  const generalInfo = get(generalInfoData, "blockcodes.nodes[0].generalInfo") as
    | Blockcode_Generalinfo
    | undefined;

  if (generalInfo == undefined) return null;

  const { logo } = generalInfo;

  return (
    <Box hideFrom="lg">
      <Flex justifyContent="space-between" alignItems="center">
        <Link as={NextLink} href="/">
          <Box flex={1} maxWidth="64px" width="64px">
            {logo && (
              <Image
                src={logo.sourceUrl!}
                alt={logo.altText!}
                aspectRatio={logo.mediaDetails?.width! / logo.mediaDetails?.height!}
              />
            )}
          </Box>
        </Link>

        <Hamburger toggled={isOpen} toggle={toggleOpen} />
      </Flex>

      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={() => toggleOpen(false)}
        autoFocus={false}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader>
            <Flex justifyContent="center">
              <Box flex={1} maxWidth="160px">
                {logo && (
                  <Image
                    src={logo.sourceUrl!}
                    alt={logo.altText!}
                    aspectRatio={logo.mediaDetails?.width! / logo.mediaDetails?.height!}
                  />
                )}
              </Box>
            </Flex>
          </DrawerHeader>

          <DrawerBody>
            <Box>
              <InputGroup as="form" onSubmit={onSendRequestHandler}>
                <Input
                  placeholder="Tìm kiếm..."
                  ref={(instanceRef) => {
                    inputRef.current = instanceRef;
                  }}
                />
                <InputRightElement>
                  <Flex
                    cursor="pointer"
                    _hover={{ color: "primary.500", transition: "all 500ms" }}
                  >
                    <Icon as={BiSearch} boxSize={5} />
                  </Flex>
                </InputRightElement>
              </InputGroup>
            </Box>

            <Box>{menuItems}</Box>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

const HeaderOnDesktop = () => {
  const theme = useTheme();
  const { data: navigationData } = useQuery<Get_NavigationQuery>(GET_NAVIGATION);
  const { data: generalInfoData } = useQuery<Get_General_InfoQuery>(GET_GENERAL_INFO);
  const inputRef = useRef<HTMLInputElement | null>();
  const router = useRouter();

  const onSendRequestHandler = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      router.push(`/tim-kiem?search=${inputRef.current?.value}`);

      if (inputRef.current) {
        inputRef.current.value = "";
        inputRef.current.blur();
      }
    },
    [router]
  );

  const menuItems = useMemo(() => {
    if (navigationData == undefined) return null;

    const tree = [] as ExtendMenuItem[];

    const flatTree: any = {};

    navigationData.menuItems?.edges.forEach((el) => {
      const newItem = { ...el.node } as ExtendMenuItem;
      const { id, parentId } = newItem;

      flatTree[id] = flatTree[id] || [];

      newItem.children = flatTree[id];
      parentId
        ? (flatTree[parentId] = flatTree[parentId] || []).push(newItem)
        : tree.push(newItem);
    })!;

    function recursiveRender(tree: ExtendMenuItem[], level: number) {
      if (tree.length === 0) return;

      return tree.map((el) => {
        return (
          <Flex
            position="relative"
            paddingX={4}
            paddingY={3}
            key={el.id}
            alignItems="center"
            justifyContent="space-between"
            _hover={{
              [`& .sub-menu-${level + 1}`]: {
                display: "block",
                boxShadow: "lg",
              },
            }}
          >
            <Flex
              flex={1}
              alignItems="center"
              justifyContent="space-between"
              _hover={{ color: theme.colors.primary[500] }}
            >
              <Link
                as={NextLink}
                href={el.path!}
                fontWeight="semibold"
                textDecoration="none"
                _hover={{ textDecoration: "none" }}
                whiteSpace="nowrap"
              >
                {el.label}
              </Link>
              {el.children.length ? <Icon as={BiChevronDown} marginLeft={2} /> : null}
            </Flex>
            {el.children.length ? (
              <Flex
                position="absolute"
                display={`none`}
                className={`sub-menu-${level + 1}`}
                top={level === 0 ? "100%" : 0}
                left={level === 0 ? 0 : "100%"}
                flexDirection="column"
                backgroundColor="white"
                paddingLeft={level === 0 ? 0 : 2}
              >
                {recursiveRender(el.children, level + 1)}
              </Flex>
            ) : null}
          </Flex>
        );
      });
    }

    const result = recursiveRender(tree, 0);

    return <Fragment>{result}</Fragment>;
  }, [navigationData, theme]);

  const generalInfo = get(generalInfoData, "blockcodes.nodes[0].generalInfo") as
    | Blockcode_Generalinfo
    | undefined;

  if (generalInfo == undefined) return null;

  const { logo } = generalInfo;

  return (
    <Flex hideBelow="lg" alignItems="center" gap={4}>
      <Box flex={1} maxWidth="80px">
        {logo && (
          <Link as={NextLink} href="/" width="full" height="full">
            <Image
              src={logo.sourceUrl!}
              alt={logo.altText!}
              aspectRatio={logo.mediaDetails?.width! / logo.mediaDetails?.height!}
            />
          </Link>
        )}
      </Box>
      <Flex flexGrow={1} justifyContent={"center"} zIndex={99}>
        {menuItems}
      </Flex>
      <Box>
        <InputGroup as="form" onSubmit={onSendRequestHandler}>
          <Input
            placeholder="Tìm kiếm..."
            ref={(instanceRef) => {
              inputRef.current = instanceRef;
            }}
          />
          <InputRightElement as="button" type="submit">
            <Flex
              cursor="pointer"
              _hover={{ color: "primary.500", transition: "all 500ms" }}
            >
              <Icon as={BiSearch} boxSize={5} />
            </Flex>
          </InputRightElement>
        </InputGroup>
      </Box>
    </Flex>
  );
};

export default Header;
