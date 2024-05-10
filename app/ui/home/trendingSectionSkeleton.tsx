import React from "react";
import MovieCard from "../movies/movieCard";
import styles from "@/app/styles/Home.module.css";
import moviesData from "@/app/data/movies.json";
import { Movie } from "@/app/types/movie";

const TrendingSectionSkeleton = ({
  data,
  Card,
}: {
  data: Movie[];
  Card: typeof MovieCard;
}) => {
  const sectionTitle = `Top Trending ${
    typeof data === typeof moviesData ? "Movies" : "TV-Shows"
  }`;
  return (
    <section className="flex flex-col w-full">
      <h2 className="text-2xl font-bold pt-5 px-5 text-grey-800 bg-white">
        {sectionTitle}
      </h2>
      <section
        className={`${styles.itemsList} flex flex-row w-full gap-4 overflow-auto items-center`}
      >
        {data.map((item, index) => (
          <Card key={index} movie={item} />
        ))}
      </section>
    </section>
  );
};

export default TrendingSectionSkeleton;
