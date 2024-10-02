import { getMovie, getMovieCast } from "@/app/api/movie/movieServices";
import Image from "next/image";
import { CastList } from "../cast/castList";
import { WatchlistButton } from "../buttons/watchlistButton";
import { TextExpander } from "../textExpander";
import MediaRating from "../rating/mediaRating";
import { SessionProvider } from "next-auth/react";
import { getTVCast, getTVShow } from "@/app/api/tv/tvServices";
import { DetailedMovie, Movie } from "@/app/types/movie";
import { DetailedTVSeries, TVShow } from "@/app/types/tvShow";

export async function MediaDetails({
  mediaId,
  isMovie,
}: {
  mediaId: string;
  isMovie: boolean;
}) {
  const urlPrefixOriginal = "https://image.tmdb.org/t/p/w500";
  const media = isMovie ? await getMovie(mediaId) : await getTVShow(mediaId);

  const genreNames = media.genres.map((genre) => genre.name).join(", ");

  const cast = isMovie ? await getMovieCast(mediaId) : await getTVCast(mediaId);

  const IMDbRating = () => (
    <div className=" p-1">
      IMDb Rating:{" "}
      <span className="text-yellow-500 text-xl font-bold ">
        {media.vote_average ? media.vote_average.toFixed(1) : "NR"}
      </span>
      <span>{media.vote_average ? "/10" : ""}</span>
    </div>
  );

  return (
    <div className="flex flex-col md:flex-row">
      <div className="w-full md:w-1/5">
        <Image
          className="mb-4 rounded"
          alt="poster"
          src={`${urlPrefixOriginal}/${media.poster_path}`}
          width={300}
          height={450}
        />
        <WatchlistButton contentId={mediaId} />
        <a
          href="#reviews"
          className="text-indigo-600 hover:text-indigo-800 visited:text-purple-600 mt-4"
        >
          Click here for more reviews
        </a>
      </div>
      <div className="w-full flex flex-col">
        <div className="flex flex-row justify-between items-center ml-8 relative">
          <h1 className="text-4xl font-bold mb-2">
            {isMovie
              ? (media as DetailedMovie).title
              : (media as DetailedTVSeries).name}
          </h1>
          <div className="flex flex-col md:absolute top-0 right-0  gap-2">
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
            {genreNames} |{" "}
            {isMovie
              ? (media as DetailedMovie).runtime
              : (media as DetailedTVSeries).episode_run_time}{" "}
            | Released:{" "}
            {isMovie
              ? (media as DetailedMovie).release_date
              : (media as DetailedTVSeries).first_air_date}
          </p>
          <h2 className="text-2xl font-bold mb-2">Overview</h2>
          <TextExpander text={media.overview} initialClampLines={5} />
          <p className="font-bold mt-4">
            Directed by: <span className="font-normal">media.director</span>
          </p>
          <p className="font-bold">
            Screenplay by: <span className="font-normal">movie.screenplay</span>
          </p>
          <div className="flex mt-4">
            <CastList cast={cast} />
          </div>
          <div className="mt-4">
            <p>
              Available on:
              {/* {movie.streamingServices.map((service) => (
                  <span
                    key={service}
                    className="inline-block bg-black text-white p-1 mx-2"
                  >
                    {service}
                  </span>
                ))} */}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
