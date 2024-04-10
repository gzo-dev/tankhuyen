import { CSSProperties } from "react";
import NextImage, { ImageProps } from "next/image";
import { AspectRatio, AspectRatioProps } from "@chakra-ui/react";

interface ExtendedImageProps extends ImageProps {
  aspectRatio?: AspectRatioProps["ratio"];
  AspectRatioProps?: AspectRatioProps;
}

const defaultStyle: CSSProperties = {
  objectFit: "cover",
};

const blurDataURL =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAIAAAAmkwkpAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAP0lEQVR4nAE0AMv/ALa2ts3Cu9XLwsLExABMTU0qJiQHAgBJSkoAy83OV1tdTU9SxsnKAPX19ebn5+fo6ff4+LOYHUdB8d4dAAAAAElFTkSuQmCC";

const Image = (props: ExtendedImageProps) => {
  const { src, fill = true, width, aspectRatio, AspectRatioProps, ...restProps } = props;

  if (fill) {
    return (
      <AspectRatio
        position="relative"
        width="full"
        ratio={aspectRatio}
        {...AspectRatioProps}
      >
        <NextImage
          src={src}
          fill={fill}
          placeholder="blur"
          style={defaultStyle}
          blurDataURL={blurDataURL}
          {...restProps}
        />
      </AspectRatio>
    );
  }

  return (
    <NextImage src={src} placeholder="blur" blurDataURL={blurDataURL} {...restProps} />
  );
};

export default Image;
