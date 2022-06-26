import "react-notion/src/styles.css";
export default ({ Component, pageProps }: { Component: any; pageProps: any }) => {
  return (
    <>
      <Component {...pageProps} />
    </>
  );
};
