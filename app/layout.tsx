"use client";
import { inter } from "./fonts";
import "@/styles/css/bootstrap.css";
import "/public/assets/css/nifty.css";
import "/public/assets/css/solaceMS.css";
import "/public/assets/css/tabulator.css";
import "/public/assets/premium/icon-sets/icons/line-icons/premium-line-icons.css";
import "/public/assets/premium/icon-sets/icons/solid-icons/premium-solid-icons.css";

import HeaderBar from "./components/nav/HeaderNav";
import NavBar from "./components/nav/navCompo";
import Script from "next/script";
import StoreProvider from "./StoreProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          cross-origin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;700&family=Ubuntu:wght@400;500;700&display=swap"
          rel="stylesheet"
        />

        <link rel="icon" href="/assets/img/favicon.ico" />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/assets/img/favicon/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="96x96"
          href="/assets/img/favicon/favicon-96x96.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/assets/img/favicon/favicon-16x16.png"
        />
        <meta name="msapplication-TileColor" content="#ffffff" />
        <meta
          name="msapplication-TileImage"
          content="/assets/img/favicon/ms-icon-144x144.png"
        />
      </head>
      <body className="jumping">
        <div id="__next">
          <Script
            src="/assets/js/nifty.js"
            strategy="beforeInteractive"
          ></Script>
          <Script src="/assets/vendors/popper.min.js"></Script>
          <Script src="/assets/vendors/bootstrap.min.js"></Script>

          <div id="root" className="root mn--max hd--sticky hd--expanded">
            <HeaderBar />
            <StoreProvider>
              <section id="content" className="content">
                <main>
                  <div className="content__wrap">{children}</div>
                </main>
              </section>
              <nav id="mainnav-container" className="mainnav">
                <div className="mainnav__inner">
                  <div className="p-0 mainnav__top-content scrollable-content">
                    <NavBar />
                  </div>
                </div>
              </nav>
            </StoreProvider>
          </div>
        </div>
      </body>
    </html>
  );
}
