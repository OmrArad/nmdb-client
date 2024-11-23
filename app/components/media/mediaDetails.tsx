"use server";
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
import { RecommendationsSlider } from "./RecommendationsSlider";
import TrailerButtonClientWrapper from "../trailer/trailerButtonClientWrapper";
import StreamingServicesSection from "./StreamingServicesSection";

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

  return (
    <div className="flex flex-col md:flex-row bg-white p-6 rounded-md shadow-md">
      <div className="w-full md:w-1/5">
        <Image
          priority = {true}
          className="mb-3 rounded"
          alt="poster"
          src={`${media.poster_path}`}
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
        {media.video_links && media.video_links.length > 0 && (
          <TrailerButtonClientWrapper videoKey={media.video_links} />
        )}

        {/* Streaming services section */}
        <StreamingServicesSection
          services={Object.fromEntries(
            Object.entries(media.streaming_services).map(([country, services]) => [
              country,
              services.map((service) => ({
                ...service,
                provider_id: service.provider_id.toString(),
                provider_name: service.provider_name,
              })),
            ])
          )}
        />
      </div>
      
      <div className="w-full md:w-4/5 md:pl-6 flex flex-col">
        <div className="flex flex-row justify-between items-start mb-4">
          <h1 className="text-4xl font-bold mb-2">{title}</h1>
          <div className="flex flex-col items-end space-y-2">
            <SessionProvider>
              <MediaRating contentId={mediaId} isMovie={isMovie} media={media} />
            </SessionProvider>
            <IMDbRating />
          </div>
        </div>
        
        <p className="mb-2 text-gray-700">
          {genreNames} | {runtime} mins | Released: {release_date}
        </p>
        
        <h2 className="text-2xl font-bold mb-2">Overview</h2>
        <TextExpander text={media.overview} initialClampLines={5} />
        
        {isMovie && (
          <>
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
          </>
        )}
        
        <div className="flex mt-4">
          <CastList cast={cast} />
        </div>

        {/* Recommended Section */}
        {media.recommendations && Array.isArray(media.recommendations) && media.recommendations.length > 0 ? (
          <div className="mt-4">
            <h2 className="text-2xl font-bold mb-4">
              Similar {isMovie ? "Movies" : "TV Shows"}
            </h2>
            <RecommendationsSlider recommendations={media.recommendations} isMovie={isMovie} />
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
      </div>
    </div>
  );
}