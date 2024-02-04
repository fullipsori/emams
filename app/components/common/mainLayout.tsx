import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import "@/public/css/bootstrap.css";
// --- react-tabulator css ---
import "react-tabulator/lib/styles.css";
import HeaderBar from "../nav/HeaderNav";
import NavBar from "../nav/Navbar";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <header>
          <HeaderBar />
        </header>
        <NavBar />
        <main>
          <div className="content" style={{ paddingTop: 56 }}>
            {children}
          </div>
          <Script src="/js/nav2.js" strategy="beforeInteractive"></Script>
        </main>
      </body>
    </html>
  );
}
