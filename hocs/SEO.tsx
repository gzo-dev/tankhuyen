import { get } from "lodash";
import Head from "next/head";
import { NextSeo } from "next-seo";
import React, { Fragment } from "react";
import { useQuery } from "@apollo/client";

import { GET_GENERAL_INFO } from "@/queries";
import {
  Blockcode_Generalinfo,
  Fragment_Page_TypeFragment,
} from "@/__generated__/graphql";

const SEO = ({ data = {} }: { data?: Fragment_Page_TypeFragment }) => {
  const { data: defaultData } = useQuery(GET_GENERAL_INFO);

  const generalInfo = get(defaultData, "blockcodes.nodes[0].generalInfo") as
    | Blockcode_Generalinfo
    | undefined;

  const { seo, featuredImage } = data;

  const pageTitle = get(seo, "title");
  const pageDescription = get(seo, "metaDesc");
  const pageSourceImg = get(featuredImage, "node.sourceUrl") as string | undefined;
  const pageAltText = get(featuredImage, "node.altText");
  const pageImgWidth = get(featuredImage, "node.mediaDetails.width");
  const pageImgHeight = get(featuredImage, "node.mediaDetails.height");

  if (generalInfo == undefined) return null;

  const { title, description, canonical, banner, logo } = generalInfo;

  const { sourceUrl, mediaDetails, altText } = banner ?? {};

  const { sourceUrl: sourceLogo } = logo!;

  return (
    <Fragment>
      <NextSeo
        title={pageTitle || title!}
        description={pageDescription || description!}
        canonical={canonical!}
        openGraph={{
          url: canonical!,
          title: pageTitle || title!,
          description: pageDescription || description!,
          images: [
            {
              url: pageSourceImg! || sourceUrl!,
              width: pageImgWidth || mediaDetails?.width,
              height: pageImgHeight || mediaDetails?.height,
              alt: pageAltText || altText!,
              type: "image/jpeg",
            },
          ],
          siteName: canonical!,
        }}
        themeColor="#FFF"
        additionalLinkTags={[
          {
            rel: "icon",
            href: "/favicon.ico",
            sizes: "32x32",
          },
          {
            rel: "icon",
            href: "/favicon-16x16.png",
            sizes: "16x16",
          },
          {
            rel: "icon",
            href: "/favicon-32x32.png",
            sizes: "32x32",
          },
          {
            rel: "apple-touch-icon",
            href: "/apple-touch-icon.png",
            sizes: "180x180",
            type: "image/png",
          },
          {
            rel: "icon",
            href: sourceLogo!,
          },
        ]}
      />
      <Head>
        <meta name="color-scheme" content="light" />
      </Head>
    </Fragment>
  );
};

export default SEO;
