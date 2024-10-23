import { getMovie, getMovieCast } from "@/app/api/movie/movieServices";
import Image from "next/image";
import { CastList } from "../cast/castList";
import { WatchlistButton } from "../watchlist/watchlistButton";
import { TextExpander } from "../textExpander";
import MediaRating from "../rating/mediaRating/mediaRating";
import { SessionProvider } from "next-auth/react";
import { getTVCast, getTVShow } from "@/app/api/tv/tvServices";
import { DetailedMovie } from "@/app/types/movie";
import { DetailedTVSeries } from "@/app/types/tvShow";
import { CastMember } from "@/app/types/cast";
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
    <div className=" p-1">
      IMDb Rating:{" "}
      <span className="text-yellow-500 text-xl font-bold ">
        {media.vote_average ? media.vote_average.toFixed(1) : "NR"}
      </span>
      <span>{media.vote_average ? "/10" : ""}</span>
    </div>
  );

  console.log("media videos is", media.video_links[0]);
  console.log(
    "new media director is",
    media.director ? media.director.name : "N/A"
  );

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
          <WatchlistButton contentId={mediaId} />
        </SessionProvider>
        <a
          href="#reviews"
          className="text-indigo-600 hover:text-indigo-800 visited:text-purple-600 pt-4"
        >
          Click here for more reviews
        </a>
        <TrailerButtonClientWrapper videoKey={media.video_links} />
      </div>
      <div className="w-full flex flex-col">
        <div className="flex flex-row justify-between items-center ml-8 relative">
          <h1 className="text-4xl font-bold mb-2">{title}</h1>
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
