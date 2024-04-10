import { ApolloClient, NormalizedCacheObject } from "@apollo/client";
import { GET_INJECT_SCRIPT, GET_GENERAL_INFO, GET_NAVIGATION } from "@/queries";

const prefetchData = async (apolloClient: ApolloClient<NormalizedCacheObject>) => {
  await Promise.all(
    [GET_NAVIGATION, GET_GENERAL_INFO, GET_INJECT_SCRIPT].map((query) => {
      return apolloClient.query({ query });
    })
  );
};

export default prefetchData;
