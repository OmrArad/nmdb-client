import { ActorDetailsProps } from "@/app/types/actor";
import Image from "next/image";
import { TextExpander } from "../textExpander";

const ActorDetails = ({ actor }: ActorDetailsProps) => {
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
        <div className="mt-4 sm:mt-0 sm:ml-6 overflow-hidden ">
          <h1 className="text-3xl font-bold">{actor.name}</h1>
          <p className="text-sm text-gray-500 mt-2">
            {actor.known_for_department}
          </p>
          {/* Use the TextExpander for the biography */}
          <TextExpander text={actor.biography} initialClampLines={5} />
          {/* <p className="mt-2 text-lg truncate">{actor.biography}</p> */}
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
    </div>
  );
};

export default ActorDetails;
