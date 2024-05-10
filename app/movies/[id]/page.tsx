"use client";
import type { DetailedMovie } from "@/app/types/movie";
import movieObject from "@/app/data/movies.json";
import React from "react";
import axios from "axios";
import Image from "next/image";

type MoviePageProps = {
  id: number;
};

const MoviePage: React.FC<MoviePageProps> = ({ id }) => {
  const urlPrefix = "https://image.tmdb.org/t/p/w220_and_h330_face";
  const urlPrefixOriginal = "https://image.tmdb.org/t/p/original";

  const [movie, setMovie] = React.useState<DetailedMovie>(movieObject[0]);

  React.useEffect(() => {
    axios
      .get(`http://localhost:5001/1`)
      .then((response) => {
        setMovie(response.data);
        console.log(response.data);
      })
      .catch((error) => console.log(error));
  }, [id]);

  const genreNames = movie.genres.map((genre) => genre.name).join(", ");

  return (
    <div className="container mx-auto my-8 p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/5">
            <Image
              className="mb-4"
              alt="poster"
              src={`${urlPrefixOriginal}/${movie.poster_path}`}
              width={300}
              height={450}
            />
            <div className="bg-yellow-400 text-xl font-bold p-2 mb-4">
              {movie.vote_average ? movie.vote_average.toFixed(1) : "NR"}
            </div>
            {/* <p>{movie.reviewersQuote}</p> */}
            <a
              href="#reviews"
              className="text-indigo-600 hover:text-indigo-800 visited:text-purple-600"
            >
              Click here for more reviews
            </a>
          </div>
          <div className="w-full md:w-2/3 md:pl-8">
            <h1 className="text-4xl font-bold mb-2">{movie.title}</h1>
            <p className="mb-2">
              {genreNames} | {movie.runtime} | Released: {movie.release_date}
            </p>
            <h2 className="text-2xl font-bold mb-2">Overview</h2>
            <p>{movie.overview}</p>
            <p className="font-bold mt-4">
              Directed by: <span className="font-normal">movie.director</span>
            </p>
            <p className="font-bold">
              Screenplay by:{" "}
              <span className="font-normal">movie.screenplay</span>
            </p>
            <div className="flex mt-4">
              {/* Thumbnails for actors would go here */}
            </div>
            <div className="mt-4">
              <p>
                Available on:
                {/* {movie.streamingServices.map((service) => (
                  <span
                    key={service}
                    className="inline-block bg-black text-white p-1 mx-2"
                  >
                    {service}
                  </span>
                ))} */}
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
