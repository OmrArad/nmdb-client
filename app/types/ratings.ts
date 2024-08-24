export type RatingItem = {
  ID: string;
  User_ID: string;
  is_movie: boolean;
  media_ID: string;
  rating: number;
  rating_date: string;
};

export type RatingsResponse = {
  ratings: RatingItem[];
};
