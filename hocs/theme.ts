import { extendTheme, withDefaultColorScheme } from "@chakra-ui/react";
import { withProse } from "@nikolovlazar/chakra-ui-prose";

var config = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

export var theme = extendTheme(
  {
    styles: {
      global: {
        "::selection": {
          color: "white",
          backgroundColor: "primary.900",
        },
        ".disable-scroll": {
          overflow: "hidden",
        },
        ".aligncenter": {
          margin: "0 auto",
        },
      },
    },
    fonts: {
      heading: "var(--font-serif)",
      body: "var(--font-serif)",
    },
    config,
    colors: {
      primary: {
        "50": "#eef9ff",
        "100": "#d9f1ff",
        "200": "#bce7ff",
        "300": "#8edaff",
        "400": "#59c3ff",
        "500": "#33a5fe",
        "600": "#258cf4",
        "700": "#156fe0",
        "800": "#185ab5",
        "900": "#194e8f",
        "950": "#143057",
      },
    },
    semanticTokens: {
      colors: {},
    },
    components: {
      Button: {},
      Container: {
        baseStyle: {
          maxW: "container.xl",
        },
      },
      Input: {
        defaultProps: {
          focusBorderColor: "primary.300",
        },
      },
      Heading: {
        baseStyle({ theme }: { theme: any }) {
          return {
            "&.underline": {
              position: "relative",
              _before: {
                content: '""',
                position: "absolute",
                top: "120%",
                left: "50%",
                width: "30%",
                height: "2px",
                backgroundColor: "primary.600",
                transform: "translateX(-50%)",

                [`@media screen and (min-width: ${theme.breakpoints.md})`]: {
                  left: 0,
                  height: "4px",
                  transform: "unset",
                },
              },
            },
          };
        },
      },
      Accordion: {
        baseStyle: {
          container: {
            padding: 0,
          },
        },
      },
      Spinner: {
        baseStyle: {
          color: "primary.500",
        },
        defaultProps: {
          size: "lg",
        },
      },
    },
  },

  withDefaultColorScheme({ colorScheme: "primary", components: ["Button"] }),
  withProse({
    baseStyle: {
      "ul>li::marker, ol>li::marker": {
        color: "black",
      },

      table: {
        borderWidth: 1,
        maxWidth: "container.lg",
        marginBottom: 0,
        marginTop: 4,
      },
      td: {
        borderWidth: 1,
        borderStyle: "solid",
        fontSize: (theme) => {
          return {
            base: 13,
            md: 16,
          };
        },
      },
      "tr:first-of-type": {
        fontWeight: "bold",
      },
      "table td": {
        verticalAlign: "middle",
      },
      h1: {},
      h2: {},
      h3: {},

      h4: {
        fontWeight: "bold",
      },
      h5: {},
      h6: {},
      p: {
        marginTop: 0,
        marginBottom: 2,
      },
    },
  })
);

// {
//   // Styles for the base style
//   baseStyle: {},
//   // Styles for the size variations
//   sizes: {},
//   // Styles for the visual style variations
//   variants: {},
//   // The default `size` or `variant` values
//   defaultProps: {},
// }

// const breakpoints = {
//   base: "0em", // 0px
//   sm: "30em", // ~480px. em is a relative unit and is dependant on the font size.
//   md: "48em", // ~768px
//   lg: "62em", // ~992px
//   xl: "80em", // ~1280px
//   "2xl": "96em", // ~1536px
// };

// {sm: '640px', md: '768px', lg: '1024px', xl: '1280px'}
