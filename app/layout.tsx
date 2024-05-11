import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import styles from "@/app/styles/Home.module.css";
import Toolbar from "./ui/toolbar/toolbar";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NMDB",
  description:
    "The Next Movie Database, your place to connect with other movie and TV fans and get recommendations based on your preferences.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Toaster position="top-right" />
        <div className={`${styles.container} h-full md:h-screen`}>
          <Toolbar />
          <div className="flex h-full flex-col md:flex-row md:overflow-hidden">
            <div className="flex-grow p-2 md:overflow-y-auto md:px-0 pb-0">
              {children}
              <footer className={`${styles.footer}`}></footer>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
