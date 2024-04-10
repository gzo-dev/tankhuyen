import { get } from "lodash";
import Head from "next/head";
import Script from "next/script";
import React, { Fragment } from "react";
import { useQuery } from "@apollo/client";

import { GET_INJECT_SCRIPT } from "@/queries";
import { Blockcode_Injectscript } from "@/__generated__/graphql";

const ExternalScript = () => {
  const { data } = useQuery(GET_INJECT_SCRIPT);

  const injectScriptData = get(data, "blockcodes.nodes[0].injectScript") as
    | Blockcode_Injectscript
    | undefined;

  if (injectScriptData == undefined) return null;

  // const { appendbody, appendhead } = injectScriptData;

  return (
    <Fragment>
      <Head>
        <meta
          name="google-site-verification"
          content="fGDuAqXnWFhuFN6knLoaRfwdzvaFO0L0URiI4rCFRVg"
        />
      </Head>
      {/* {appendhead && (
        <Head>
          <script>{appendhead.replaceAll(/\<\/?script\>/g, "")}</script>
        </Head>
      )} */}
      {/* {appendbody && (
        <Script id="appendbody" strategy="afterInteractive">
          {appendbody.replaceAll(/\<\/?script\>/g, "")}
        </Script>
      )} */}
    </Fragment>
  );
};

export default ExternalScript;
