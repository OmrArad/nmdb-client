// components/MainRatingsList.tsx
"use client";
import React, { useEffect } from "react";
import RatingsItem from "./ratingsItem";
import { useRatings } from "@/app/context/userRatingContext";
import { getRatingsByUser } from "@/app/api/ratings/ratingsServices";

const RatingsList = () => {
  const { ratings, updateRatings } = useRatings();

  useEffect(() => {
    const fetchRatings = async () => {
      try {
        const ratingsData = await getRatingsByUser(); // Fetch for logged-in user
        updateRatings(ratingsData);
      } catch (error) {
        console.error("Failed to load ratings", error);
      }
    };

    if (!ratings) {
      fetchRatings();
    }
  }, [ratings]);

  if (!ratings) {
    return <p>Loading ratings...</p>;
  }

  return (
    <div className="bg-gray-100 rounded-xl px-12">
      <h1 className="text-2xl font-bold container mx-auto px-4 pt-12">
        My Ratings
      </h1>
      <div className="container mx-auto px-4 py-6 md:h-[calc(100vh-254px)] overflow-scroll">
        {ratings.ratings?.map((rating) => (
          <RatingsItem key={rating.ID} rating={rating} />
        ))}
      </div>
    </div>
  );
};

export default RatingsList;
