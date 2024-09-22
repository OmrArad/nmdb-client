import { ActorDetailsProps, MediaAppearance } from "@/app/types/actor";
import Image from "next/image";
import { TextExpander } from "../textExpander";
import MovieCard from "../movies/movieCard";
import TvShowCard from "../tvSeries/tvShowCard";
import TrendingSectionSkeleton from "../home/trendingSectionSkeleton";
import Link from "next/link";

const pathname = "http://localhost:3000";

const ActorDetails = ({ actor, mediaAppearances }: ActorDetailsProps) => {
  const getMediaCard = (media: MediaAppearance, index: number) =>
    media.media_kind === "movie" ? (
      <MovieCard key={index} movie={media} />
    ) : (
      <TvShowCard key={index} tvShow={media} />
    );

  const getMediaLink = (media: MediaAppearance) => {
    const link = media.media_kind === "movie" ? `movies` : `tv`;
    return `${pathname}/${link}/${media.id}`;
  };

  const getCastAppearances = () =>
    mediaAppearances.cast.map((media, index) => getMediaCard(media, index));

  const getCrewAppearances = () =>
    mediaAppearances.crew.map((media, index) => getMediaCard(media, index));

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col items-center sm:flex-row">
        <div className="flex-shrink-0">
          <Image
            src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
            alt={actor.name}
            width={300}
            height={450}
            className="rounded-md"
          />
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-6 overflow-hidden">
          <h1 className="text-3xl font-bold">{actor.name}</h1>
          <p className="text-sm text-gray-500 mt-2">
            {actor.known_for_department}
          </p>

          <TextExpander text={actor.biography} initialClampLines={5} />

          <div className="mt-4">
            <p>
              <strong>Birthday:</strong> {actor.birthday}
            </p>
            {actor.deathday && (
              <p>
                <strong>Deathday:</strong> {actor.deathday}
              </p>
            )}
            <p>
              <strong>Place of Birth:</strong> {actor.place_of_birth}
            </p>
            <p>
              <strong>Popularity:</strong> {actor.popularity.toFixed(1)}
            </p>
            {actor.homepage && (
              <p>
                <strong>Website:</strong>{" "}
                <a
                  href={actor.homepage}
                  target="_blank"
                  className="text-blue-600"
                >
                  {actor.homepage}
                </a>
              </p>
            )}
            <p>
              <strong>IMDB:</strong>{" "}
              <a
                href={`https://www.imdb.com/name/${actor.imdb_id}`}
                target="_blank"
                className="text-blue-600"
              >
                View on IMDB
              </a>
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Media Appearances</h2>

        {mediaAppearances.cast.length > 0 && (
          <TrendingSectionSkeleton
            sectionTitle="Cast"
            Trending={getCastAppearances}
          />
        )}
        {mediaAppearances.crew.length > 0 && (
          <TrendingSectionSkeleton
            sectionTitle="Crew"
            Trending={getCrewAppearances}
          />
        )}

        {mediaAppearances.cast.length > 0 && (
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-2">Cast</h3>
            <div className="flex gap-4 overflow-x-auto pb-3">
              {mediaAppearances.cast.map((media) => (
                <Link
                  key={media.id}
                  className="bg-gray-800 p-4 rounded-lg max-h-[calc(22rem)] min-w-52 w-52 hover:bg-gray-700 cursor-pointer overflow-y-hidden flex flex-col"
                  href={getMediaLink(media)}
                >
                  <Image
                    src={`https://image.tmdb.org/t/p/w200${media.poster_path}`}
                    alt={media.name || media.title!}
                    width={150}
                    height={225}
                    className="rounded-md self-center"
                  />
                  <h4 className="text-lg font-semibold mt-2 text-white">
                    {media.name || media.title}
                  </h4>
                  <p className="text-sm text-gray-400">
                    {media.character ? `as ${media.character}` : ""}
                  </p>
                  <p className="text-sm text-gray-400">
                    {media.first_air_date || media.release_date}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}

        {mediaAppearances.crew.length > 0 && (
          <div>
            <h3 className="text-xl font-semibold mb-2">Crew</h3>
            <div className="flex gap-4 overflow-x-auto pb-3">
              {mediaAppearances.crew.map((media) => (
                <div
                  key={media.id}
                  className="bg-gray-800 p-4 rounded-lg max-h-[calc(22rem)] w-52 min-w-52 hover:bg-gray-700 cursor-pointer overflow-y-hidden flex flex-col"
                >
                  <Image
                    src={`https://image.tmdb.org/t/p/w200${media.poster_path}`}
                    alt={media.title!}
                    width={150}
                    height={225}
                    className="rounded-md self-center"
                  />
                  <h4 className="text-lg font-semibold mt-2 text-white">
                    {media.title}
                  </h4>
                  <p className="text-sm text-gray-400">{media.job}</p>
                  <p className="text-sm text-gray-400">{media.release_date}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ActorDetails;
