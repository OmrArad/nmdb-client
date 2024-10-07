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
  },
};

const WatchlistStreamingServices = ({
  setFilteredWatchlist,
}: {
  setFilteredWatchlist: (filteredWatchlist: any[]) => void;
}) => {
  const [services, setServices] = useState<any>(mockServicesData.providers);
  // const [filteredWatchlist, setFilteredWatchlist] = useState<any[]>([]);
  const [activeService, setActiveService] = useState<string | null>(null);
  const [watchlist, setWatchlist] = useState<any[]>([]); // Store the actual watchlist

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
  }, []);

  // Handle filtering when a service is selected
  const handleFilterByService = (serviceName: string) => {
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
  };

  return (
    <div className="streaming-services">
      <h2 className="text-xl font-bold mb-4">Streaming Services</h2>
      <div className="grid grid-cols-2 gap-4">
        {Object.keys(services).map((serviceName) => (
          <div
            key={serviceName}
            onClick={() => handleFilterByService(serviceName)}
            className={`cursor-pointer p-2 border rounded-lg ${
              activeService === serviceName
                ? "bg-blue-500 text-white"
                : "bg-gray-100"
            }`}
          >
            <span>{serviceName}</span>
            <span className="ml-2 text-sm text-gray-500">
              ({services[serviceName].count} items)
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WatchlistStreamingServices;
