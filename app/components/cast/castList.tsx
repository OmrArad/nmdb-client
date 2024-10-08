"use client";
import { CastMember } from "@/app/types/cast";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

type CastListProps = {
  cast: CastMember[];
};

export function CastList({ cast }: CastListProps) {
  const pathname = usePathname();

  const getActorLink = (member: { id: number }): {} => {
    return {
      pathname: `${pathname}/../../actors/${member.id}`,
    };
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold">Top Billed Cast</h2>
      <div className="flex overflow-x-scroll space-x-4 py-4 sm:max-w-64 md:max-w-96 2xl:max-w-screen-lg lg:max-w-2xl xl:max-w-3xl">
        {cast.slice(0, 9).map((member) => (
          <Link
            key={member.id}
            href={getActorLink(member)}
            className="flex flex-col items-center min-w-[100px] sm:min-w-[150px]"
          >
            <Image
              src={`https://image.tmdb.org/t/p/w500${member.profile_path}`}
              alt={member.name}
              width={150}
              height={225}
              className="rounded-md"
            />
            <h3 className="mt-2 text-sm sm:text-lg font-medium text-center">
              {member.name}
            </h3>
            <p className="text-xs sm:text-sm text-gray-500 text-center">
              {member.character}
            </p>
          </Link>
        ))}
        <button className="flex-shrink-0 min-w-[100px] h-full flex items-center justify-center text-blue-600 font-medium">
          View More &rarr;
        </button>
      </div>
      <button className="mt-4 text-blue-600 font-medium">
        Full Cast & Crew
      </button>
    </div>
  );
}
