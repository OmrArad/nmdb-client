"use client";
import React from "react";
import MovieCard from "../movies/movieCard";
import TrendingSectionSkeleton from "./trendingSectionSkeleton";
import axios from "axios";
import { TrendingMovies } from "@/app/types/trending";
import trending from "@/app/data/trendingMovies.json";

const TrendingMoviesSection = () => {
  const [trendingMovies, setTrendingMovies] = React.useState<TrendingMovies>(
    trending.trendingMovies
  );

  React.useEffect(() => {
    axios
      .get("http://localhost:5001/trendingMovies")
      .then((response) => {
        setTrendingMovies(response.data);
        console.log(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <TrendingSectionSkeleton data={trendingMovies?.results!} Card={MovieCard} />
  );
};

export default TrendingMoviesSection;
