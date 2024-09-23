export type ActorDetailsProps = {
  actor: ActorResponse;
  mediaAppearances: ActorMediaResponse;
};
export type ActorResponse = {
  name: string;
  biography: string;
  birthday: string;
  deathday: string | null;
  gender: number;
  homepage: string | null;
  imdb_id: string;
  known_for_department: string;
  place_of_birth: string;
  popularity: number;
  profile_path: string;
};

export type MediaAppearance = {
  id: number;
  name?: string;
  title?: string;
  character?: string;
  job?: string;
  media_kind: "movie" | "tv";
  release_date: string;
  first_air_date: string;
  poster_path?: string;
  vote_average: number;
};

export type ActorMediaResponse = {
  cast: MediaAppearance[];
  crew: MediaAppearance[];
};
