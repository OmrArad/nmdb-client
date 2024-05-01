import React from "react";
import MovieCard from "../movies/movieCard";
import moviesData from "@/app/data/movies.json";
import TrendingSectionSkeleton from "./trendingSectionSkeleton";

const TrendingMoviesSection = () => {
  const movieData = Array.from({ length: 11 }, () => ({
    id: 1,
    title: "Movie title",
    image:
      "https://image.tmdb.org/t/p/original/cxevDYdeFkiixRShbObdwAHBZry.jpg",
    genre: "Action",
    rating: 9.8,
  }));

  return <TrendingSectionSkeleton data={moviesData} Card={MovieCard} />;
};

export default TrendingMoviesSection;
