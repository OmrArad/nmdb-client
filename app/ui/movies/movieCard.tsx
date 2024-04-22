import React from "react";
import styles from "@/app/styles/MovieCard.module.css";

interface MovieProps {
  title: string;
  genre: string;
  rating: number;
  // include other props as necessary, e.g., image URL
}

const MovieCard: React.FC<MovieProps> = ({ title, genre, rating }) => {
  return (
    <div className={styles.movieCard}>
      <div className={styles.ratingBadge}>{rating}</div>
      <div className={styles.movieImage}>
        {/* Image would go here, for now it's a placeholder */}
      </div>
      <div className={styles.movieInfo}>
        <h3 className={styles.movieTitle}>{title}</h3>
        <p className={styles.movieGenre}>{genre}</p>
      </div>
    </div>
  );
};

// export default MovieCard;

interface MovieProps {
  title: string;
  genre: string;
  rating: number;
  // include other props as necessary, e.g., image URL
}

const Movie: React.FC<MovieProps> = ({ title, genre, rating }) => {
  return (
    <div className="min-w-48 max-h-96 bg-white rounded-lg overflow-hidden shadow-md relative">
      <div className="absolute top-0 right-0 bg-yellow-400 rounded-bl-lg py-1 px-2 text-sm font-bold">
        {rating}
      </div>
      <div className="h-72 bg-gray-200">
        {/* Image would go here, for now it's a placeholder */}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-gray-600 text-sm">{genre}</p>
      </div>
    </div>
  );
};

export default Movie;
