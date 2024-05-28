import MovieCard from "../movies/movieCard";
import TrendingSectionSkeleton from "./trendingSectionSkeleton";
import { getTrendingMovies } from "@/app/api/movie/movieServices";

const TrendingMoviesSection = async () => {
  const trendingMovies = await getTrendingMovies();

  return <TrendingSectionSkeleton data={trendingMovies} Card={MovieCard} />;
};

export default TrendingMoviesSection;
