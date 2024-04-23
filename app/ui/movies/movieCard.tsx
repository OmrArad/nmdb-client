"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
interface MovieProps {
  id: number;
  title: string;
  image: string;
  genre: string;
  rating: number;
  // include other props as necessary, e.g., image URL
}

const MovieCard: React.FC<MovieProps> = ({
  id,
  title,
  image,
  genre,
  rating,
}) => {
  const pathname = usePathname();
  return (
    <Link
      href={`${pathname}/movies/${id}`}
      className="min-w-48 max-h-96 bg-white rounded-lg overflow-hidden shadow-md relative"
    >
      <div className="absolute top-0 right-0 bg-yellow-400 rounded-bl-lg py-1 px-2 text-sm font-bold">
        {rating}
      </div>
      <div className="h-72 bg-gray-200">
        <Image alt="poster" src={image} width={192} height={288} />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 text-sm">{genre}</p>
      </div>
    </Link>
  );
};

export default MovieCard;
