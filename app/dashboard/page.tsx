import React from "react";
import Image from "next/image";
import styles from "../styles/Home.module.css";

export default function Dashboard() {
  return (
    <>
      <main>
        <section className={styles.welcomeSection}>
          <h1>Welcome.</h1>
          <h2>Explore your favorite movies and TV shows</h2>
          <div className={styles.searchBar}>{/* Search bar component */}</div>
        </section>
        <section className={styles.recommendationsSection}>
          <h2>Streaming Recommendations.</h2>
          <p>
            Interested to see what we think is your best go-to streaming
            service?
          </p>
          <button className={styles.exploreButton}>
            Explore Recommendations
          </button>
        </section>
        <section className={styles.moviesList}>
          {/* Movie cards component */}
        </section>
      </main>
      <footer className={styles.footer}>
        <h2>The Movie and TV show forum!</h2>
        <p>Looking to connects with other people?</p>
        <button className={styles.forumButton}>Go To Forum</button>
      </footer>
    </>
  );
}
