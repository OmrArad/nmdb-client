import Image from "next/image";
import { ActorDetailsProps } from "@/app/types/actor";
import { TextExpander } from "../textExpander";

export default async function ActorDetails({ actor }: ActorDetailsProps) {
  const urlPrefixOriginal = "https://image.tmdb.org/t/p/original";

  return (
    <div className="flex flex-col md:flex-row">
      <div className="w-full md:w-1/5">
        <Image
          className="mb-4"
          alt="profile"
          src={`${urlPrefixOriginal}/${actor.profile_path}`}
          width={300}
          height={450}
        />
        <div className="bg-yellow-400 text-xl font-bold p-2 mb-4">
          {actor.popularity ? actor.popularity.toFixed(1) : "N/A"}
        </div>
        {actor.homepage && (
          <a
            href={actor.homepage}
            target="_blank"
            className="text-indigo-600 hover:text-indigo-800 visited:text-purple-600"
          >
            Official Website
          </a>
        )}
      </div>
      <div className="w-full md:w-3/4 md:pl-8">
        <h1 className="text-4xl font-bold mb-2">{actor.name}</h1>
        <p className="mb-2">
          {actor.known_for_department} | Born: {actor.birthday} in{" "}
          {actor.place_of_birth}
        </p>
        {actor.deathday && (
          <p className="mb-2">
            <strong>Passed Away:</strong> {actor.deathday}
          </p>
        )}
        <h2 className="text-2xl font-bold mb-2">Biography</h2>
        <TextExpander text={actor.biography} initialClampLines={10} />
        <div className="mt-4">
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
  );
}
