import "../styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Usagi Placeholder</title>
        <meta
          name="description"
          content="Like JSON Placeholder but it is mofumofu"
        />
        <link
          rel="icon"
          href="https://avatars.githubusercontent.com/u/59821765?v=4"
        />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
