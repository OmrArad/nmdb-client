import { getTrendingTVShows } from "@/app/api/tv/tvServices";
import TrendingSectionSkeleton from "../trending/trendingSectionSkeleton";
import { getTrendingMovies } from "@/app/api/movie/movieServices";
import MediaCard from "../../media/mediaCard";

const TrendingSection = async () => {
  const trendingShows = await getTrendingTVShows();
  const trendingMovies = await getTrendingMovies();

  const TrendingMovies = () => {
    return trendingMovies.map((item, index) => (
      <MediaCard key={index} type={"Movie"} kind={"movie"} media={item} />
    ));
  };
  const TrendingTvShows = () => {
    return trendingShows.map((item, index) => (
      <MediaCard key={index} type={"TVShow"} kind={"tv"} media={item} />
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
