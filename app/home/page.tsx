import React from "react";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import MovieCard from "../ui/movies/movieCard";
import Movie from "../ui/movies/movieCard";
import SearchSection from "../ui/home/searchSection";
import RecommendationsSection from "../ui/home/RecommendationsSection";

export default function Dashboard() {
  return (
    <div className="flex md:flex-row flex-col">
      <main className="flex flex-1 flex-col h-full items-strech md:w-2/3">
        <section className="flex flex-col justify-between md:flex-row">
          <SearchSection />
          <RecommendationsSection />
        </section>
        <section
          className={`${styles.moviesList} flex flex-row md:flex-wrap w-full gap-4 overflow-auto items-center`}
        >
          <Movie title="Movie title" genre="Action" rating={9.8} />
          <Movie title="Movie title" genre="Action" rating={9.8} />
          <Movie title="Movie title" genre="Action" rating={9.8} />
          <Movie title="Movie title" genre="Action" rating={9.8} />
          <Movie title="Movie title" genre="Action" rating={9.8} />
          <Movie title="Movie title" genre="Action" rating={9.8} />
          <Movie title="Movie title" genre="Action" rating={9.8} />
          <Movie title="Movie title" genre="Action" rating={9.8} />
          <Movie title="Movie title" genre="Action" rating={9.8} />
          <Movie title="Movie title" genre="Action" rating={9.8} />
          <Movie title="Movie title" genre="Action" rating={9.8} />
          {/* Movie cards component */}
        </section>
      </main>
      <aside className="flex-0 basis-84">
        <section className={styles.footer}>
          <h2>The Movie and TV show feed!</h2>
          <p>Looking to connects with other people?</p>
          <button className={styles.forumButton}>
            Login to post in the feed
          </button>
          <section
            className={`${styles.feedPost} flex flex-row md:flex-wrap w-full gap-4 overflow-auto items-center`}
          >
            {/* Feed posts component */}
          </section>
        </section>
      </aside>
    </div>
  );
}
