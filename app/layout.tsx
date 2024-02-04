"use client";
import { Inter } from "next/font/google";
import "@/styles/css/globals.css";
import "@/styles/style.css";
import "@/styles/css/bootstrap.css";
import "@/styles/css/nifty.css";
import "@/styles/css/user_common.css";
import "/public/assets/premium/icon-sets/icons/line-icons/premium-line-icons.css";
import "/public/assets/premium/icon-sets/icons/solid-icons/premium-solid-icons.css";

import "react-tabulator/lib/css/tabulator.css";
import HeaderBar from "./components/nav/HeaderNav";
import NavBar from "./components/nav/navCompo";
import Script from "next/script";
import StoreProvider from "./StoreProvider";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* <Script src="/assets/js/nav.js" strategy="beforeInteractive"></Script> */}
        <Script src="/assets/js/nifty.js" strategy="beforeInteractive"></Script>
        <div id="root" className="root mn--max hd--sticky hd--expanded">
          <HeaderBar />
          <StoreProvider>
            <main>
              <div className="content">{children}</div>
            </main>
            <nav id="mainnav-container" className="mainnav">
              <div className="mainnav__inner">
                <div className="p-0 mainnav__top-content scrollable-content">
                  <NavBar />
                </div>
              </div>
            </nav>
          </StoreProvider>
        </div>
      </body>
    </html>
  );
}
