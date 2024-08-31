export type ActorDetailsProps = {
  actor: ActorResponse;
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
