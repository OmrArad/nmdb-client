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
              src={
                member?.profile_path
                  ? `https://image.tmdb.org/t/p/w500${member.profile_path}`
                  : "https://i.postimg.cc/g0mp1XPz/istockphoto-870832662-612x612.jpg" // Fallback image path
              }
              alt={member?.name || "Unknown Actor"} // Fallback alt text
              width={150}
              height={225}
              className="rounded-md"
            />
            <h3 className="mt-2 text-sm sm:text-lg font-medium text-center">
              {member?.name || "Unknown Actor"} {/* Fallback name */}
            </h3>
            <p className="text-xs sm:text-sm text-gray-500 text-center">
              {member?.character || "Unknown Character"} {/* Fallback character */}
            </p>
          </Link>
        ))}
      </div>
      <button className="mt-4 text-blue-600 font-medium">
        Full Cast & Crew
      </button>
    </div>
  );
}  
