import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
  from,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";

import { app } from "../../context/auth";
import { getAuth } from "firebase/auth";

const cache = new InMemoryCache({});

const URI = process.env.BACKEND_GATEWAY_URI

const httpLink = new HttpLink({
  uri: URI
});

const authLink = setContext(async (_, { headers }) => {
  let token: string;
  const Auth = getAuth(app);
  if (Auth.currentUser) {
    token = await Auth.currentUser.getIdToken(true)
  }
  console.log(token);
  console.log("header send");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );
  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const client: ApolloClient<NormalizedCacheObject> = new ApolloClient({
  ssrMode: true,
  cache,
  link: from([authLink, errorLink, httpLink])
});

export default client;
