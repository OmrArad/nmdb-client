import React from "react";
import MovieCard from "../movies/movieCard";
import styles from "@/app/styles/Home.module.css";
import moviesData from "@/app/data/movies.json";

const TrendingMoviesSection = () => {
  const movieData = Array.from({ length: 11 }, () => ({
    id: 1,
    title: "Movie title",
    image:
      "https://image.tmdb.org/t/p/original/cxevDYdeFkiixRShbObdwAHBZry.jpg",
    genre: "Action",
    rating: 9.8,
  }));

  return (
    <section className="flex flex-col w-full">
      <h2 className="text-2xl font-bold pt-5 px-5 text-grey-800 bg-white">
        Top Trending Movies
      </h2>
      <section
        className={`${styles.moviesList} flex flex-row w-full gap-4 overflow-auto items-center`}
      >
        {movieData.map((movie, index) => (
          <MovieCard
            key={index}
            id={movie.id}
            title={movie.title}
            image={movie.image}
            genre={movie.genre}
            rating={movie.rating}
          />
        ))}
      </section>
    </section>
  );
};

export default TrendingMoviesSection;
