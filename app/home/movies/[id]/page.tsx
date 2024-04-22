import React from "react";

const MoviePage = () => {
  // Mock data or you can fetch real data from an API
  const movieData = {
    title: "Movie Title",
    genres: ["Genre 1", "Genre 2"],
    duration: "97 minutes",
    releaseYear: "2005",
    overview:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry...",
    director: "Director name",
    screenplay: "Screenwriter",
    rating: 7.9,
    reviewersQuote:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry",
    streamingServices: ["NETFLIX", "prime video"], // You can add logos or icons for each service
    // ... other movie data
  };

  return (
    <div className="container mx-auto my-8 p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/3">
            {/* Placeholder for movie image */}
            <div className="bg-gray-300 h-64 mb-4"></div>
            <div className="bg-yellow-400 text-xl font-bold p-2 mb-4">
              {movieData.rating}
            </div>
            <p>{movieData.reviewersQuote}</p>
            <a
              href="#reviews"
              className="text-indigo-600 hover:text-indigo-800 visited:text-purple-600"
            >
              Click here for more reviews
            </a>
          </div>
          <div className="w-full md:w-2/3 md:pl-8">
            <h1 className="text-4xl font-bold mb-2">{movieData.title}</h1>
            <p className="mb-2">
              {movieData.genres.join(" | ")} | {movieData.duration} | Released:{" "}
              {movieData.releaseYear}
            </p>
            <h2 className="text-2xl font-bold mb-2">Overview</h2>
            <p>{movieData.overview}</p>
            <p className="font-bold mt-4">
              Directed by:{" "}
              <span className="font-normal">{movieData.director}</span>
            </p>
            <p className="font-bold">
              Screenplay by:{" "}
              <span className="font-normal">{movieData.screenplay}</span>
            </p>
            <div className="flex mt-4">
              {/* Thumbnails for actors would go here */}
            </div>
            <div className="mt-4">
              <p>
                Available on:
                {movieData.streamingServices.map((service) => (
                  <span
                    key={service}
                    className="inline-block bg-black text-white p-1 mx-2"
                  >
                    {service}
                  </span>
                ))}
              </p>
            </div>
          </div>
        </div>
        {/* Here you might include additional sections such as a forum link, etc */}
      </div>
    </div>
  );
};

export default MoviePage;
