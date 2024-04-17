import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import styles from "@/app/styles/Home.module.css";
import Toolbar from "./ui/toolbar/toolbar";

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
        <div className={styles.container}>
          <Toolbar />
          {children}
        </div>
      </body>
    </html>
  );
}
