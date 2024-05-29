import { getTrendingTVShows } from "@/app/api/tv/tvServices";
import TvShowCard from "../tvSeries/tvShowCard";
import TrendingSectionSkeleton from "./trendingSectionSkeleton";
import { getTrendingMovies } from "@/app/api/movie/movieServices";
import MovieCard from "../movies/movieCard";

const TrendingSection = async () => {
  const trendingShows = await getTrendingTVShows();
  const trendingMovies = await getTrendingMovies();

  const TrendingMovies = () => {
    return trendingMovies.map((item, index) => (
      <MovieCard key={index} movie={item} />
    ));
  };
  const TrendingTvShows = () => {
    return trendingShows.map((item, index) => (
      <TvShowCard key={index} tvShow={item} />
    ));
  };

  return (
    <>
      <TrendingSectionSkeleton
        sectionTitle="Movies"
        Trending={TrendingMovies}
      />
      <TrendingSectionSkeleton
        sectionTitle="TV-Shows"
        Trending={TrendingTvShows}
      />
    </>
  );
};

export default TrendingSection;
