// components/RecommendationsSlider.tsx
'use client';

import React from 'react';
import MediaCard from './mediaCard'; // Adjust import based on your project structure
import { TrendingMovie } from "@/app/types/movie";
import { TrendingTVShow } from "@/app/types/tvShow";

export function RecommendationsSlider({
  recommendations,
  isMovie,
}: {
  recommendations: (TrendingMovie | TrendingTVShow)[];
  isMovie: boolean;
}) {
  return (
    <div className="relative">
      {/* Left navigation button */}
      <button
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full z-10"
        onClick={() => {
          const row = document.getElementById('recommendations-row');
          if (row) {
            row.scrollBy({ left: -300, behavior: 'smooth' });
          }
        }}
      >
        &#10094;
      </button>

      {/* Cards container */}
      <div
        id="recommendations-row"
        className="flex space-x-4 overflow-x-scroll no-scrollbar"
      >
        {recommendations.map((item, index) => {
          const mediaType = isMovie ? "Movie" : "TVShow";
          const kind = isMovie ? "movie" : "tv";
          console.log(item)
          return (
            <div key={index} className="min-w-[20%]" style={{ flex: '0 0 20%', scrollSnapAlign: 'start' }}>
              <MediaCard
                type={mediaType}
                kind={kind}
                media={item}
              />
            </div>
          );
        })}
      </div>

      {/* Right navigation button */}
      <button
        className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full z-10"
        onClick={() => {
          const row = document.getElementById('recommendations-row');
          if (row) {
            row.scrollBy({ left: 300, behavior: 'smooth' });
          }
        }}
      >
        &#10095;
      </button>
    </div>
  );
}
