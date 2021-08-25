import "../styles/main.scss";
//import { AuthProvider } from "../context/auth";
import { useEffect } from "react";
import { ApolloProvider } from "@apollo/client";
import { AppProps } from "next/dist/next-server/lib/router/router";

import client from "../components/graphql/client";
import Header from "../components/header";
import Footer from "../components/footer";
import Meta from "../components/meta";
import * as gtag from '../lib/gtag'
import router from "next/router";

const MyApp = ({ Component, pageProps }: AppProps) => {
  useEffect(() => {
    const handleRouteChange = (url) => {
      gtag.pageview(url)
    }
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])
  return (
    <>
      <ApolloProvider client={client}>
        <Meta />
        <Header />
        <Component {...pageProps} />
        <Footer />
      </ApolloProvider>
    </>
  );
};

export default MyApp;
