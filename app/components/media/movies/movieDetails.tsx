import { getMovie, getMovieCast } from "@/app/api/movie/movieServices";
import Image from "next/image";
import { CastList } from "../../cast/castList";
import { WatchlistButton } from "../../buttons/watchlistButton";
import { TextExpander } from "../../textExpander";
import MediaRating from "../../rating/mediaRating";
import { SessionProvider } from "next-auth/react";

export async function MovieDetails({ movieId }: { movieId: string }) {
  const urlPrefixOriginal = "https://image.tmdb.org/t/p/w500";
  const movie = await getMovie(movieId);

  const genreNames = movie.genres.map((genre) => genre.name).join(", ");

  const cast = await getMovieCast(movieId);

  const IMDbRating = () => (
    <div className=" p-1">
      IMDb Rating:{" "}
      <span className="text-yellow-500 text-xl font-bold ">
        {movie.vote_average ? movie.vote_average.toFixed(1) : "NR"}
      </span>
      <span>{movie.vote_average ? "/10" : ""}</span>
    </div>
  );

  return (
    <div className="flex flex-col md:flex-row">
      <div className="w-full md:w-1/5">
        <Image
          className="mb-4 rounded"
          alt="poster"
          src={`${urlPrefixOriginal}/${movie.poster_path}`}
          width={300}
          height={450}
        />
        <WatchlistButton contentId={movieId} />
        <a
          href="#reviews"
          className="text-indigo-600 hover:text-indigo-800 visited:text-purple-600 mt-4"
        >
          Click here for more reviews
        </a>
      </div>
      <div className="w-full flex flex-col">
        <div className="flex flex-row justify-between items-center ml-8 relative">
          <h1 className="text-4xl font-bold mb-2">{movie.title}</h1>
          <div className="flex flex-col md:absolute top-0 right-0  gap-2">
            <SessionProvider>
              <MediaRating contentId={movieId} isMovie={true} />
            </SessionProvider>
            <IMDbRating />
          </div>
        </div>
        <div className="w-full md:w-2/3 md:pl-8">
          <p className="mb-2">
            {genreNames} | {movie.runtime} | Released: {movie.release_date}
          </p>
          <h2 className="text-2xl font-bold mb-2">Overview</h2>
          <TextExpander text={movie.overview} initialClampLines={5} />
          <p className="font-bold mt-4">
            Directed by: <span className="font-normal">movie.director</span>
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
