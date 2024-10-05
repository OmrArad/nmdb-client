// components/RatingsItem.tsx
import { RatingItem } from "@/app/types/ratings";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const RatingsItem = ({ rating }: { rating: RatingItem }) => {
  const {
    media_ID: content_id,
    rating: userRating,
    is_movie,
    rating_date: timestamp,
  } = rating;

  // Add navigation to the media page (movie or TV show)
  const mediaType = is_movie ? "movies" : "shows";

  return (
    <div className="bg-gray-100 border border-gray-300 rounded-xl overflow-hidden shadow-lg mb-4">
      <div className="md:flex items-start p-4">
        {/* Add your logic to display content poster here */}
        <Image
          src="/images/no-image-available.png" // Replace with actual image if available
          alt="Content Image"
          className="w-24 h-36 mr-4 rounded-lg"
          width={96}
          height={144}
        />
        <div className="flex-col justify-between">
          <div className="flex justify-between items-center">
            <Link
              href={`/${mediaType}/${content_id}`}
              className="text-xl font-bold transition-transform transform hover:scale-105"
            >
              {`Content Title`} {/* Replace with actual content title */}
            </Link>
            <span className="text-green-400 font-bold">
              {userRating.toFixed(1)}
            </span>
          </div>
          <p className="text-gray-400">
            {new Date(timestamp).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default RatingsItem;
