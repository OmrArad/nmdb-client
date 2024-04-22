import React from "react";
import styles from "../styles/Landing.module.css";
import Image from "next/image";
import Toolbar from "../ui/toolbar/toolbar";

export default function Landing() {
  const imageUrl =
    "https://image.tmdb.org/t/p/original/ctMserH8g2SeOAnCw5gFjdQF8mo.jpg";
  return (
    <>
      <Toolbar landing />
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
    </>
  );
}
