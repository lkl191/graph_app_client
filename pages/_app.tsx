import "../styles/main.scss";
//import { AuthProvider } from "../context/auth";
import { ApolloProvider } from "@apollo/client";

import client from "../components/graphql/client";
import Header from "../components/header";
import Footer from "../components/footer";

//_app.jsは二回レンダリングされる
const MyApp = ({ Component, pageProps }) => {
  return (
    <>
      <ApolloProvider client={client}>
        <Header />
        <Component {...pageProps} />
        <Footer />
      </ApolloProvider>
    </>
  );
};

export default MyApp;
