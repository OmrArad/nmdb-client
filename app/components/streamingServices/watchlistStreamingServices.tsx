"use client";
import { useEffect, useState } from "react";
import { getWatchlist } from "@/app/api/watchlist/watchlistServices"; // Assuming you have a working watchlist API

const mockServicesData = {
  providers: {
    "Amazon Prime Video": {
      count: 1,
      tmdb_ids: [{ is_movie: 0, tmdb_id: "62017" }],
    },
    "Apple TV Plus": {
      count: 1,
      tmdb_ids: [{ is_movie: 0, tmdb_id: "95396" }],
    },
    "Disney Plus": {
      count: 1,
      tmdb_ids: [{ is_movie: 1, tmdb_id: "1022789" }],
    },
    Hulu: {
      count: 2,
      tmdb_ids: [
        { is_movie: 1, tmdb_id: "550" },
        { is_movie: 0, tmdb_id: "111800" },
      ],
    },
    Netflix: {
      count: 3,
      tmdb_ids: [
        { is_movie: 1, tmdb_id: "704239" },
        { is_movie: 1, tmdb_id: "646097" },
        { is_movie: 1, tmdb_id: "569547" },
      ],
    },
    Netflix1: {
      count: 3,
      tmdb_ids: [
        { is_movie: 1, tmdb_id: "704239" },
        { is_movie: 1, tmdb_id: "646097" },
        { is_movie: 1, tmdb_id: "569547" },
      ],
    },
    Netflix2: {
      count: 3,
      tmdb_ids: [
        { is_movie: 1, tmdb_id: "704239" },
        { is_movie: 1, tmdb_id: "646097" },
        { is_movie: 1, tmdb_id: "569547" },
      ],
    },
    Netflix3: {
      count: 3,
      tmdb_ids: [
        { is_movie: 1, tmdb_id: "704239" },
        { is_movie: 1, tmdb_id: "646097" },
        { is_movie: 1, tmdb_id: "569547" },
      ],
    },
    Netflix4: {
      count: 3,
      tmdb_ids: [
        { is_movie: 1, tmdb_id: "704239" },
        { is_movie: 1, tmdb_id: "646097" },
        { is_movie: 1, tmdb_id: "569547" },
      ],
    },
  },
};

const WatchlistStreamingServices = ({
  setFilteredWatchlist,
}: {
  setFilteredWatchlist: (filteredWatchlist: any[]) => void;
}) => {
  const [services, setServices] = useState<any>(mockServicesData.providers);
  const [activeService, setActiveService] = useState<string | null>(null);
  const [watchlist, setWatchlist] = useState<any[]>([]); // Store the actual watchlist
  const [minCount, setMinCount] = useState<number>(1);
  const [maxCount, setMaxCount] = useState<number>(3);

  // Fetch watchlist using the working API
  useEffect(() => {
    const fetchWatchlist = async () => {
      try {
        const watchlistData = await getWatchlist();
        setWatchlist(watchlistData.Content); // Ensure this matches your watchlist structure
      } catch (error) {
        console.error("Failed to fetch watchlist", error);
      }
    };

    fetchWatchlist();

    // Calculate the minimum and maximum counts
    const counts = Object.values(services).map((service: any) => service.count);
    setMinCount(Math.min(...counts));
    setMaxCount(Math.max(...counts));
  }, [services]);

  // Function to calculate the gradient color from green to yellow to red
  const getGradientColor = (count: number) => {
    const ratio = (maxCount - count) / (maxCount - minCount); // Normalize the count between 0 and 1

    let r, g, b;

    if (ratio <= 0.5) {
      // Interpolate from green to yellow
      const greenToYellowRatio = ratio * 2; // Scale ratio to 0-1 for this range
      r = Math.round(250 * greenToYellowRatio); // Red increases from 0 to 255
      g = 190; // Green stays at 255 (full green)
      b = 0; // No blue component
    } else {
      // Interpolate from yellow to red
      const yellowToRedRatio = (ratio - 0.5) * 2; // Scale ratio to 0-1 for this range
      r = 230; // Red stays at 255 (full red)
      g = Math.round(250 * (1 - yellowToRedRatio)); // Green decreases from 255 to 0
      b = 0; // No blue component
    }

    return `rgb(${r},${g},${b})`; // Return the RGB color
  };

  // Handle filtering when a service is selected
  const handleFilterByService = (serviceName: string) => {
    if (activeService === serviceName) {
      // Unselect the service if already active
      setActiveService(null);
      setFilteredWatchlist(watchlist); // Show full watchlist if no service is selected
    } else {
      setActiveService(serviceName);

      const service = services[serviceName];

      if (service) {
        const filteredItems = watchlist.filter((item) =>
          service.tmdb_ids.some(
            (tmdbItem: any) => tmdbItem.tmdb_id === item.tmdb_id
          )
        );
        setFilteredWatchlist(filteredItems);
      }
    }
  };

  return (
    <div className="streaming-services pb-1">
      <div className="flex justify-between mb-2">
        <h2 className="text-lg font-bold">Where to watch:</h2>
        {/* Remove filter button */}
        {activeService && (
          <button
            onClick={() => {
              setActiveService(null);
              setFilteredWatchlist(watchlist); // Show full watchlist when filter is removed
            }}
            className="text-red-500 font-bold hover:underline"
          >
            Remove Filter
          </button>
        )}
      </div>
      <div className="grid grid-flow-col overflow-scroll pb-3 gap-4">
        {Object.keys(services).map((serviceName) => {
          const service = services[serviceName];
          const isActive = activeService === serviceName;
          const gradientColor = getGradientColor(service.count);

          return (
            <div
              key={serviceName}
              onClick={() => handleFilterByService(serviceName)}
              className={`cursor-pointer p-4 border rounded-lg transition transform duration-300 hover:border-blue-500 hover:bg-blue-300 border-gray-300  ${
                isActive ? "bg-blue-500 text-white" : "bg-gray-100"
              }`}
            >
              <div className="flex gap-2 justify-between items-center">
                <span className="w-max">{serviceName}</span>
                {/* Display count as a circle with dynamic gradient color */}
                <div
                  className="flex justify-center items-center rounded-full w-7 h-7 text-white border border-gray-400 brightness-90"
                  style={{ backgroundColor: gradientColor }}
                >
                  {service.count}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WatchlistStreamingServices;
