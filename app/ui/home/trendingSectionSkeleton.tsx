import React from "react";
import MovieCard from "../movies/movieCard";
import styles from "@/app/styles/Home.module.css";
import moviesData from "@/app/data/movies.json";

export type itemData = {
  id: number;
  title: string;
  image: string;
  genre: string;
  rating: number;
}[];

const TrendingSectionSkeleton = ({
  data,
  Card,
}: {
  data: itemData;
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
          <Card
            key={index}
            id={item.id}
            title={item.title}
            image={item.image}
            genre={item.genre}
            rating={item.rating}
          />
        ))}
      </section>
    </section>
  );
};

export default TrendingSectionSkeleton;
