import { ActorDetailsProps, MediaAppearance } from "@/app/types/actor";
import Image from "next/image";
import { TextExpander } from "../textExpander";
import MediaCard from "../media/mediaCard";
import TrendingSectionSkeleton from "../home/trending/trendingSectionSkeleton";
import Link from "next/link";

const pathname = "http://localhost:3000";

const ActorDetails = ({ actor, mediaAppearances }: ActorDetailsProps) => {
  const getMediaCard = (media: MediaAppearance, index: number) => (
    <MediaCard
      key={index}
      type={"MediaAppearance"}
      kind={media.media_kind}
      media={media}
    />
  );

  const getCastAppearances = () =>
    mediaAppearances.cast.map((media, index) => getMediaCard(media, index));

  const getCrewAppearances = () =>
    mediaAppearances.crew.map((media, index) => getMediaCard(media, index));

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col items-center sm:flex-row">
        <div className="flex-shrink-0">
          <Image
            src={
              actor?.profile_path
                ? `https://image.tmdb.org/t/p/w500${actor.profile_path}`
                : "https://i.postimg.cc/g0mp1XPz/istockphoto-870832662-612x612.jpg" // Fallback image path
            }
            alt={actor?.name || "Unknown Actor"} // Fallback alt text
            width={300}
            height={450}
            className="rounded-md"
          />
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-6 overflow-hidden">
          <h1 className="text-3xl font-bold">
            {actor?.name || "Unknown Actor"} {/* Fallback name */}
          </h1>
          <p className="text-sm text-gray-500 mt-2">
            {actor?.known_for_department || "Unknown Department"} {/* Fallback text */}
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
      </div>
    </div>
  );
};

export default ActorDetails;
