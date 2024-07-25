import { Html, Head, Main, NextScript } from "next/document";
import {main} from "@/js/main";
import Script from "next/script";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <Main />
        <NextScript />
        <Script id="main-script" type="text/javascript" strategy="afterInteractive">
            {`(${main}())`}
        </Script>
      </body>
    </Html>
  );
}
