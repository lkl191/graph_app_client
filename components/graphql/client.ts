import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
  from,
} from "@apollo/client";

//import { getDataFromTree } from "@apollo/client/react/ssr";
import { onError } from "apollo-link-error";
import { setContext } from "@apollo/client/link/context";

import { app } from "../../context/auth";
import { getAuth } from "firebase/auth";

const Auth = getAuth(app);
const cache = new InMemoryCache({});

const httpLink = new HttpLink({
  //uri: "http://localhost:4000/graphql",
  uri: "https://genbu.shishin.nara.jp:4000/graphql",
});

const authLink = setContext(async (_, { headers }) => {
  let token;
  if (Auth.currentUser) {
    await Auth.currentUser
      .getIdToken(true)
      .then((idToken) => {
        console.log("set token");
        token = idToken;
      })
      .catch((err) => {
        console.log(err.message);
      });
  }
  console.log(token);
  console.log("header send");
  return await {
    headers: await {
      ...headers,
      authorization: (await token) ? `Bearer ${token}` : "",
    },
  };
});

const errorLink: any = onError(({ graphQLErrors, networkError }) => {
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
  link: from([errorLink, authLink.concat(httpLink)]),
  //link: authLink.concat(httpLink),
});

export default client;
