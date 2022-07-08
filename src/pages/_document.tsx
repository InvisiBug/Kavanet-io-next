import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  let title = "Kavanet.io";

  if (process.env.NEXT_PUBLIC_LOCAL === "true") {
    title = "Kavanet.io (Local)";
  }

  return (
    <Html>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link rel="shortcut icon" href="/images/favicon.ico" />
        <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;900&display=swap" rel="stylesheet" />
      </Head>
      <body>
        <title>{title}</title>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
