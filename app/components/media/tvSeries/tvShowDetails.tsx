import Image from "next/image";
import { getTVShow, getTVCast } from "@/app/api/tv/tvServices";
import { CastList } from "../../cast/castList";
import { RatingsButton } from "../../buttons/ratingsButton";
import { WatchlistButton } from "../../buttons/watchlistButton";
import { TextExpander } from "../../textExpander";

export async function TvShowDetails({ tvShowId }: { tvShowId: string }) {
  const urlPrefixOriginal = "https://image.tmdb.org/t/p/original";
  const tvShow = await getTVShow(tvShowId);

  const genreNames = tvShow.genres.map((genre) => genre.name).join(", ");

  const cast = await getTVCast(tvShowId);

  return (
    <div className="flex flex-col md:flex-row">
      <div className="w-full md:w-1/5">
        <Image
          className="mb-4"
          alt="poster"
          src={`${urlPrefixOriginal}/${tvShow.poster_path}`}
          width={300}
          height={450}
        />
        <div className="bg-yellow-400 text-xl font-bold p-2 mb-4">
          {tvShow.vote_average ? tvShow.vote_average.toFixed(1) : "NR"}
        </div>
        {/* <p>{movie.reviewersQuote}</p> */}
        <a
          href="#reviews"
          className="text-indigo-600 hover:text-indigo-800 visited:text-purple-600"
        >
          Click here for more reviews
        </a>
        <WatchlistButton contentId={tvShowId} />
        <RatingsButton contentId={tvShowId} isMovie={false} />
      </div>
      <div className="w-full md:w-2/3 md:pl-8">
        <h1 className="text-4xl font-bold mb-2">{tvShow.name}</h1>
        <p className="mb-2">
          {genreNames} | {tvShow.episode_run_time} | Released:{" "}
          {tvShow.first_air_date}
        </p>
        <h2 className="text-2xl font-bold mb-2">Overview</h2>
        <TextExpander text={tvShow.overview} initialClampLines={5} />
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
