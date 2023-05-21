// import "react-notion/src/styles.css";
import NextNProgress from "nextjs-progressbar";

// core styles shared by all of react-notion-x (required)
import "react-notion-x/src/styles.css";

// used for code syntax highlighting (optional)
import "prismjs/themes/prism-tomorrow.css";

// used for rendering equations (optional)
import "katex/dist/katex.min.css";

export default ({ Component, pageProps }: { Component: any; pageProps: any }) => {
  return (
    <>
      <NextNProgress />
      <Component {...pageProps} />
    </>
  );
};
