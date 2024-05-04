import React from "react";

const WatchlistItem = ({
  movie,
}: {
  movie: {
    title: string;
    rating: string;
    date: string;
    description: string;
    image: string;
  };
}) => {
  return (
    <div className="bg-gray-100 border border-gray-300 rounded-lg overflow-hidden shadow-lg mb-4">
      <div className="flex items-start p-4">
        <img
          src={`/images/${movie.image}`}
          alt={movie.title}
          className="w-24 h-36 mr-4"
        />
        <div className="flex-grow">
          <div className="flex-col justify-between">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">{movie.title}</h2>
              <span className="text-green-400 font-bold">{movie.rating}</span>
            </div>
            <p className="text-gray-400">{movie.date}</p>
            <p className=" text-sm mt-2">{movie.description}</p>
          </div>
          <div className="bg-transparent py-3 flex justify-between items-center">
            <div>
              <button className="text-gray-400 mr-2 hover:text-blue-500">
                Rate it!
              </button>
              <button className="text-gray-400 mr-2 hover:text-blue-500">
                Favorite
              </button>
              <button className="text-gray-400 hover:text-blue-500">
                Add to list
              </button>
            </div>
            <button className="text-red-600 hover:text-red-800">Remove</button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Watchlist = () => {
  const movies = [
    {
      title: "Shōgun",
      rating: "86%",
      date: "February 27, 2024",
      description:
        "In Japan in the year 1600, at the dawn of a century-defining civil war, Lord Yoshii Toranaga is fighting for his life as his enemies on the Council of Regents unite against him, when a mysterious European ship is found marooned in a nearby fishing village.",
      image: "shogun.jpg",
    },
    {
      title: "Fallout",
      rating: "84%",
      date: "April 10, 2024",
      description:
        "The story of haves and have-nots in a world in which there’s almost nothing left to have. 200 years after the apocalypse, the gentle denizens of luxury fallout shelters are forced to return to the irradiated hellscape their ancestors left behind — and are shocked to discover an incredibly complex, gleefully weird, and highly violent universe waiting for them.",
      image: "fallout.jpg",
    },
    // Add more movies as needed
  ];

  return (
    <div className="bg-gray-100 rounded-lg">
      <h1 className="text-3xl font-bold container mx-auto px-4 py-3">
        My Watchlist
      </h1>
      <div className="container mx-auto px-4 py-6 md:h-[calc(100vh-254px)] overflow-scroll">
        {movies.map((movie, index) => (
          <WatchlistItem key={index} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default Watchlist;
