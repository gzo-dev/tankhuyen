import { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import { ErrorBoundary } from "react-error-boundary";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

import SEO from "@/hocs/SEO";
import Fallback from "@/containers/Fallback";
import ChakraProvider from "@/hocs/ChakraProvider";
import BodyWrapper from "@/containers/Layout/BodyWrapper";
import { useApollo } from "@/libs/apolloClient";
import NextProgress from "@/hocs/NextProgress";
import SnackbarProvider from "@/hocs/SnackbarProvider";
import ExternalScript from "@/hocs/ExternalScript";

export default function App(props: AppProps) {
  const { pageProps, Component } = props;
  const apolloClient = useApollo(pageProps);

  return (
    <ChakraProvider>
      <ErrorBoundary fallbackRender={Fallback}>
        <ApolloProvider client={apolloClient}>
          <NextProgress />
          <GoogleReCaptchaProvider reCaptchaKey={process.env.NEXT_PUBLIC_RECAPTCHA_KEY!}>
            <SnackbarProvider>
              <BodyWrapper>
                <SEO />
                <Component {...pageProps} />
                <ExternalScript />
              </BodyWrapper>
            </SnackbarProvider>
          </GoogleReCaptchaProvider>
        </ApolloProvider>
      </ErrorBoundary>
    </ChakraProvider>
  );
}
