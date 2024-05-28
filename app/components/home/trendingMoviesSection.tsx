import MovieCard from "../movies/movieCard";
import TrendingSectionSkeleton from "./trendingSectionSkeleton";
import axios from "axios";
import { TrendingMovies } from "@/app/types/trending";
import trending from "@/app/data/trendingMovies.json";
import { getTrendingMovies } from "@/app/api/movie/movieServices";

const TrendingMoviesSection = async () => {
  // const [trendingMovies, setTrendingMovies] = React.useState<TrendingMovies>(
  //   trending.trendingMovies
  // );

  const trendingMovies = await getTrendingMovies();

  // React.useEffect(() => {
  //   axios
  //     .get("/api/movie/trending")
  //     .then((response) => {
  //       setTrendingMovies(response.data);
  //     })
  //     .catch((error) => console.log(error));
  // }, []);

  return <TrendingSectionSkeleton data={trendingMovies} Card={MovieCard} />;
};

export default TrendingMoviesSection;
