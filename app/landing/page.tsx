import React from "react";
import styles from "../styles/Landing.module.css";
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";

const links = [
  { name: "Sign In", href: "/singIn", style: "signIn" },
  {
    name: "Sign Up",
    href: "/singUp",
    style: "signUp",
  },
  {
    name: "Continue as a guest",
    href: "/guest",
    style: "guest",
  },
];

export default function Landing() {
  const imageUrl =
    "https://image.tmdb.org/t/p/original/ctMserH8g2SeOAnCw5gFjdQF8mo.jpg";
  return (
    <div className={styles.container}>
      <div className={styles.toolbar}>
        <h1 className={styles.title}>NMDB</h1>
        <div className={styles.buttons}>
          {links.map((link) => {
            const linkName = link.name;
            return (
              <Link
                key={linkName}
                href={link.href}
                className={`${styles.button} ${styles[link.style]}`}
              >
                {linkName}
              </Link>
            );
          })}
        </div>
      </div>
      <main className={styles.main}>
        <p className={styles.welcome}>
          <b>Welcome.</b>
        </p>
        <p className={styles.description}>
          <b>The Next Movie Database</b>, your place to connect with other movie
          and TV fans and get recommendations based on your preferences.
        </p>
      </main>
      <footer className={styles.imageWrapper}>
        <Image
          src={imageUrl}
          alt="Next Movie DB Background"
          layout="fill"
          objectFit="cover"
        />
      </footer>
    </div>
  );
}
