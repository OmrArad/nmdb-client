import { getMovie, getMovieCast } from "@/app/api/movie/movieServices";
import { getTVCast, getTVShow } from "@/app/api/tv/tvServices";
import Image from "next/image";
import { CastList } from "../cast/castList";
import { WatchlistButton } from "../watchlist/watchlistButton";
import { TextExpander } from "../textExpander";
import MediaRating from "../rating/mediaRating/mediaRating";
import { SessionProvider } from "next-auth/react";
import { DetailedMovie } from "@/app/types/movie";
import { DetailedTVSeries } from "@/app/types/tvShow";
import { CastMember } from "@/app/types/cast";
import MediaCard from "@/app/components/media/mediaCard";
import { RecommendationsSlider } from "./RecommendationsSlider";
import TrailerButtonClientWrapper from "../trailer/trailerButtonClientWrapper";

export async function MediaDetails({
  mediaId,
  isMovie,
}: {
  mediaId: string;
  isMovie: boolean;
}) {
  const urlPrefixOriginal = "https://image.tmdb.org/t/p/w500";
  const urlPrefixYoutube = "https://www.youtube.com/embed";
  let media: DetailedMovie | DetailedTVSeries;
  let cast: CastMember[];
  let title: string;
  let runtime: number | number[];
  let release_date: string;

  // Fetch media and cast based on whether it's a movie or TV show
  if (isMovie) {
    media = await getMovie(mediaId);
    cast = await getMovieCast(mediaId);
    title = media.title;
    runtime = media.runtime;
    release_date = media.release_date;
  } else {
    media = await getTVShow(mediaId);
    cast = await getTVCast(mediaId);
    title = media.name;
    runtime = media.episode_run_time;
    release_date = media.first_air_date;
  }

  const genreNames = media.genres.map((genre) => genre.name).join(", ");
  const IMDbRating = () => (
    <div className="p-1">
      IMDb Rating:{" "}
      <span className="text-yellow-500 text-xl font-bold">
        {media.vote_average ? media.vote_average.toFixed(1) : "NR"}
      </span>
      <span>{media.vote_average ? "/10" : ""}</span>
    </div>
  );

  console.log("media videos is", media.video_links[0]);
  return (
    <div className="flex flex-col md:flex-row">
      <div className="w-full md:w-1/5">
        <Image
          className="mb-3 rounded"
          alt="poster"
          src={`${urlPrefixOriginal}/${media.poster_path}`}
          width={300}
          height={450}
        />
        <SessionProvider>
          <WatchlistButton contentId={mediaId} isMovie={isMovie} />
        </SessionProvider>
        <a
          href="#reviews"
          className="text-indigo-600 hover:text-indigo-800 visited:text-purple-600 pt-4"
        >
          Click here for more reviews
        </a>
        <TrailerButtonClientWrapper videoKey={media.video_links} />

{/* Streaming services section */}
{/* Check if there are streaming services available for the selected country code - currently it's 'US' by default */}
{media.streaming_services["US"].length > 0 && (
  <div className="flex items-center mt-4">
    <p className="font-bold mr-2 text-lg">Available on:</p>
    <div className="flex overflow-x-auto whitespace-nowrap space-x-2 scrollbar-hide">
      {/* If we'll implement a countries slider, make sure to change the country code here to the selected one */}
      {media.streaming_services["US"] && media.streaming_services["US"].map((service) => (
        <span key={service.name} className="inline-block">
          <img 
            src={`https://image.tmdb.org/t/p/w200${service.logo_path}`} 
            alt={service.name} 
            title={service.name}
            className="h-8 w-auto"
          />
        </span>
      ))}
    </div>
  </div>
)}



      </div>
      <div className="w-full flex flex-col">
        <div className="flex flex-row justify-between items-center ml-8 relative">
          <h1 className="text-4xl font-bold mb-2">{title}</h1>
          <div className="flex flex-col md:absolute top-0 right-0 gap-2">
            <SessionProvider>
              <MediaRating
                contentId={mediaId}
                isMovie={isMovie}
                media={media}
              />
            </SessionProvider>
            <IMDbRating />
          </div>
        </div>
        <div className="w-full md:w-2/3 md:pl-8">
          <p className="mb-2">
            {genreNames} | {runtime} | Released: {release_date}
          </p>
          <h2 className="text-2xl font-bold mb-2">Overview</h2>
          <TextExpander text={media.overview} initialClampLines={5} />
          <p className="font-bold mt-4">
            Directed by:{" "}
            <span className="font-normal">
              {media.director ? media.director.name : "N/A"}
            </span>
          </p>
          <p className="font-bold">
            Screenplay by:{" "}
            <span className="font-normal">
              {media.screenwriter ? media.screenwriter.name : "N/A"}
            </span>
          </p>
          <div className="flex mt-4">
            <CastList cast={cast} />
          </div>

          {/* Recommended Section */}
          {media.recommendations &&
          Array.isArray(media.recommendations) &&
          media.recommendations.length > 0 ? (
            <div className="mt-4">
              <h2 className="text-2xl font-bold mb-4">
                Similar {isMovie ? "Movies" : "TV Shows"}
              </h2>
              <RecommendationsSlider
                recommendations={media.recommendations}
                isMovie={isMovie}
              />
            </div>
          ) : (
            <div className="mt-4">
              <h2 className="text-2xl font-bold mb-4">
                No Recommendations Available
              </h2>
              <p>
                {media.recommendations === undefined
                  ? "Recommendations data is currently unavailable."
                  : "It seems there are no recommendations to display at this time."}
              </p>
            </div>
          )}

          <div className="mt-4">
            <p>Available on:</p>
            {/* You can display available streaming services here if needed */}
          </div>
        </div>
      </div>
    </div>
  );
}
