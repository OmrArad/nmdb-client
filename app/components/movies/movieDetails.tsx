import { getMovie, getMovieCast } from "@/app/api/movie/movieServices";
import Image from "next/image";
import { CastList } from "../cast/castList";

export async function MovieDetails({ movieId }: { movieId: string }) {
  const urlPrefixOriginal = "https://image.tmdb.org/t/p/original";
  const movie = await getMovie(movieId);

  const genreNames = movie.genres.map((genre) => genre.name).join(", ");

  const cast = await getMovieCast(movieId);

  return (
    <div className="flex flex-col md:flex-row">
      <div className="w-full md:w-1/5">
        <Image
          className="mb-4"
          alt="poster"
          src={`${urlPrefixOriginal}/${movie.poster_path}`}
          width={300}
          height={450}
        />
        <div className="bg-yellow-400 text-xl font-bold p-2 mb-4">
          {movie.vote_average ? movie.vote_average.toFixed(1) : "NR"}
        </div>
        {/* <p>{movie.reviewersQuote}</p> */}
        <a
          href="#reviews"
          className="text-indigo-600 hover:text-indigo-800 visited:text-purple-600"
        >
          Click here for more reviews
        </a>
      </div>
      <div className="w-full md:w-2/3 md:pl-8">
        <h1 className="text-4xl font-bold mb-2">{movie.title}</h1>
        <p className="mb-2">
          {genreNames} | {movie.runtime} | Released: {movie.release_date}
        </p>
        <h2 className="text-2xl font-bold mb-2">Overview</h2>
        <p>{movie.overview}</p>
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
  );
}
