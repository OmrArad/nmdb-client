import React from "react";
import styles from "@/app/styles/Home.module.css";

const TrendingSectionSkeleton = ({
  sectionTitle,
  Trending,
}: {
  sectionTitle: string;
  Trending: () => JSX.Element[];
}) => {
  return (
    <section className="flex flex-col w-full bg-white">
      <h2 className="text-2xl font-bold pt-5 px-5 text-gray-800">
        {sectionTitle}
      </h2>
      <section
        className={`${styles.itemsList} flex flex-row w-full gap-4 overflow-auto items-center`}
      >
        <Trending />
      </section>
    </section>
  );
};

export default TrendingSectionSkeleton;
