import React from "react";
import TrendingSectionSkeleton from "./trendingSectionSkeleton";
import MovieCard from "../movies/movieCard";

export const TrendingMoviesSection = () => {
  const tvShowData = Array.from({ length: 11 }, () => ({
    id: 1,
    title: "TV-Show title",
    image:
      "https://image.tmdb.org/t/p/original/cxevDYdeFkiixRShbObdwAHBZry.jpg",
    genre: "Action",
    rating: 9.8,
  }));

  return <TrendingSectionSkeleton data={tvShowData} Card={MovieCard} />;
};

export default TrendingMoviesSection;
