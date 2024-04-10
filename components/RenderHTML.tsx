import { useEffect, useRef } from "react";
import { Box, BoxProps } from "@chakra-ui/react";
import { Prose } from "@nikolovlazar/chakra-ui-prose";
import DOMPurify, { Config } from "isomorphic-dompurify";

interface RenderHTMLProps extends BoxProps {
  data: string;
  DOMPurifyConfig?: Config;
}

export default function RenderHTML(props: RenderHTMLProps) {
  const { data, DOMPurifyConfig, ...restProps } = props;

  const proseRef = useRef<HTMLDivElement | null>();

  useEffect(() => {
    if (!proseRef.current) return;

    const targetEl = proseRef.current.querySelector(":scope *:first-child");

    if (!targetEl) return;

    const lastEl = targetEl.querySelector<HTMLElement>(":scope > *:last-child");
    const firstEl = targetEl.querySelector<HTMLElement>(":scope > *:first-child");

    if (firstEl) {
      firstEl.style.marginTop = "0px";
    }

    if (lastEl) {
      lastEl.style.marginBottom = "0px";
    }
  }, []);

  return (
    <Box
      ref={(instanceRef) => {
        proseRef.current = instanceRef;
      }}
      width="full"
      height="full"
    >
      <Prose
        {...restProps}
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(data, {
            ADD_TAGS: ["iframe"],
            ADD_ATTR: ["allow", "allowfullscreen", "frameborder", "scrolling"],
            ...DOMPurifyConfig,
          }) as string,
        }}
      />
    </Box>
  );
}
