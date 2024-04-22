import React from "react";
import Movie from "../movies/movieCard";
import styles from "@/app/styles/Home.module.css";

const TrendingMoviesSection = () => {
  const movieData = Array.from({ length: 11 }, () => ({
    title: "TV-Show title",
    genre: "Action",
    rating: 9.8,
  }));

  return (
    <section className="flex flex-col w-full">
      <h2 className="text-2xl font-bold pt-5 px-5 text-grey-800 bg-white">
        Trending TV-Shows
      </h2>
      <section
        className={`${styles.moviesList} flex flex-row w-full gap-4 overflow-auto items-center`}
      >
        {movieData.map((movie, index) => (
          <Movie
            key={index}
            title={movie.title}
            genre={movie.genre}
            rating={movie.rating}
          />
        ))}
      </section>
    </section>
  );
};

export default TrendingMoviesSection;
