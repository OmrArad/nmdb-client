"use client";
import React, { useState } from "react";
import { Spinner } from "flowbite-react";
import { IWatchlistItem } from "@/app/types/watchlist";
import TMDBRating from "./tmdbRating";
import UserRating from "./userRating";

interface RatingComponentProps {
  isMovie: boolean;
  media: IWatchlistItem;
}

const Ratings: React.FC<RatingComponentProps> = ({ isMovie, media }) => {
  const { tmdb_rating: tmdbRating } = media;
  const [loading, setLoading] = useState(false);

  return (
    <div className="flex flex-col items-end">
      <TMDBRating tmdbRating={tmdbRating} />

      {loading ? (
        <Spinner />
      ) : (
        <UserRating
          media={media}
          mediaId={media.tmdb_id}
          title={media.title}
          isMovie={isMovie}
          setLoading={setLoading}
        />
      )}
    </div>
  );
};

export default Ratings;
