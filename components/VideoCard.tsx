import React, { useEffect, useState } from "react";
import { AspectRatio, Skeleton } from "@chakra-ui/react";
import { VideoTypeData } from "@extractus/oembed-extractor";

import RenderHTML from "./RenderHTML";
import axios from "axios";

interface VideoProps {
  link: string | undefined;
}

const VideoCard = (props: VideoProps) => {
  const { link } = props;

  const [html, setHtml] = useState<string | null>(null);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (link == undefined) return;

    (async () => {
      try {
        if (!link.includes("youtu")) return;

        const { data } = await axios.get(
          `https://www.youtube.com/oembed?url=${link}&format=json`
        );

        if (data.type === "video") {
          const _result = data as VideoTypeData;
          setHtml(_result.html);
        }
      } catch (err) {
        setHasError(true);
      }
    })();
  }, [link]);

  if (hasError) return null;

  return (
    <AspectRatio ratio={16 / 9} width="full" borderRadius={16} overflow="hidden">
      <Skeleton isLoaded={!!html}>
        {html && (
          <RenderHTML
            sx={{
              width: "full",
              height: "full",
              "& iframe": {
                width: "full",
                height: "full",
              },
            }}
            data={html}
          />
        )}
      </Skeleton>
    </AspectRatio>
  );
};

export default VideoCard;
