// import "react-notion/src/styles.css";
import NextNProgress from "nextjs-progressbar";

export default ({ Component, pageProps }: { Component: any; pageProps: any }) => {
  return (
    <>
      <NextNProgress />
      <Component {...pageProps} />
    </>
  );
};
