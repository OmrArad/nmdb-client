"use client";

import Link from "next/link";
import React, { useState, useEffect, useRef} from "react";
import AdvancedSearchModal from "../search/advancedSearchModal";
import { getDiscovery } from "@/app/api/discover/DiscoverServices";
import { DiscoverResponse } from "@/app/types/discover";
import {AiOutlineClose} from "react-icons/ai";
import SearchResults from "../search/searchResults";
import { SearchResponse } from "@/app/types/search";

const RecommendationsSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAdvancedSearchOpen, setIsAdvancedSearchOpen] = useState(false);
  const [discoveryResults, setDiscoveryResults] = useState<any[]>([]);
  const modalRef  = useRef(null);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);


    // Fetch discovery data using criteria
    const handleAdvancedSearch = async (criteria: { genres?: string[]; year?: string; vote_average?: string; region?: string; provider?: string; } | undefined) => {
      try {
        const data = await getDiscovery(criteria);
        setDiscoveryResults(data);
        setIsOverlayOpen(true);
        console.log("Discovery results as saved by client:", discoveryResults);
      } catch (error) {
        console.error("Error fetching discovery data:", error);
      }
      setIsAdvancedSearchOpen(false); // Close modal after search
    };

    const clearResults = () => {
      setDiscoveryResults([]); // Clear the results
      setIsOverlayOpen(false); // Close the modal
    };

  const recommendations = [
    {
      title: "Best Go-To Streaming Service",
      label: "Let's Look At Your Watchlist!",
      href: "user/watchlist",
      text: [
        "Interested to see what we think is your best go-to streaming service?",
      ],
    },
    {
      title: "Content Recommendations",
      label: "Let's Go!",
      href: "user/recommendations",
      text: [
        "Looking for something new to watch?",
        "Check out your personalized recommendations!",
      ],
    },
    {
      title: "Use our Discovery Wizard",
      label: "Discover Content",
      href: "user/popular-shows", // Keep this for reference, but we won't use it
      text: [
        "Discover content according to multiple filters!",
        "Find your next favorite series or movie!",
      ],
      // Special flag to open modal
      openModal: true,
    },
    {
      title: "DUMMY New Movie Releases",
      label: "Discover New Movies",
      href: "user/new-movies",
      text: [
        "Find out what new movies are being released this month!",
        "Don't miss out on the latest hits!",
      ],
    },
    {
      title: "DUMMY Top Trending Series",
      label: "Check Trending Series",
      href: "user/trending-series",
      text: [
        "Catch up on the trending series everyone's talking about!",
        "Join the conversation with your friends!",
      ],
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % recommendations.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? recommendations.length - 1 : prev - 1
    );
  };

  const goToSlide = (index: React.SetStateAction<number>) => {
    setCurrentSlide(index);
  };

  const handleButtonClick = (item: any) => {
    if (item.openModal) {
      setIsAdvancedSearchOpen(true);
    }
  };

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="text-center p-8 py-2 text-white flex-1">
      <div className="relative overflow-hidden">
        <div
          className="flex transition-transform duration-300"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {recommendations.map((item, index) => (
            <div key={index} className="min-w-full relative">
              <h2 className="text-2xl font-bold mb-3">{item.title}</h2>
              <div className="mb-6">
                {item.text.map((line, idx) => (
                  <div key={idx}>{line}</div>
                ))}
              </div>
              <button
                className="w-full hover:bg-gradient-to-br from-red-200 via-red-300 to-yellow-200 group-hover:from-red-200 group-hover:via-red-300 group-hover:to-yellow-200 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 mt-2 h-12 hover:text-black font-medium py-3 px-4 rounded-2xl transition duration-300 border hover:border-2 bg-custom-gradient-1 inline-flex items-center justify-center"
                onClick={() => handleButtonClick(item)} // Trigger modal open on click
              >
                {item.label}
              </button>

              {/* Transparent arrow buttons for navigation */}
              <button
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-transparent border-none cursor-pointer opacity-50 hover:opacity-100 transition-opacity duration-300"
                onClick={prevSlide}
                aria-label="Previous Slide"
              >
                &#9664; {/* Left arrow */}
              </button>
              <button
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-transparent border-none cursor-pointer opacity-50 hover:opacity-100 transition-opacity duration-300"
                onClick={nextSlide}
                aria-label="Next Slide"
              >
                &#9654; {/* Right arrow */}
              </button>
            </div>
          ))}
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center mt-4">
          {recommendations.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 mx-1 rounded-full transition-colors duration-300 ${
                currentSlide === index ? "bg-white" : "bg-gray-500"
              }`}
              onClick={() => goToSlide(index)}
              aria-label={`Slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Render AdvancedSearchModal conditionally */}
      {isAdvancedSearchOpen && (
        <AdvancedSearchModal
          onClose={() => setIsAdvancedSearchOpen(false)}
          onAdvancedSearch={handleAdvancedSearch}
        />
      )}
            {isOverlayOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div
            ref={modalRef}
            className="w-11/12 max-w-7xl bg-gray-900 bg-opacity-80 pb-6 pt-0 rounded-lg overflow-y-auto"
          >
            <div className="flex flex-row justify-end sticky top-0 backdrop-blur-md p-4 pr-5 bg-gray-900 bg-opacity-30">
              <button
                onClick={clearResults}
                className="text-white bg-gray-800 bg-opacity-60 hover:bg-gray-700 font-bold p-1.5 rounded-full hover:bg-opacity-100"
              >
                <AiOutlineClose size={20} />
              </button>
            </div>

            <div className="h-[70vh] my-6 px-6">
              {discoveryResults.length > 0 ? (
                <SearchResults results={discoveryResults} />
              ) : (
                <h1 className="font-bold text-center">NO RESULTS FOUND</h1>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecommendationsSection;
