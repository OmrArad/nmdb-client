// Define interface for the genre of a movie
interface Genre {
  id: number;
  name: string;
}

// Define interface for the collection a movie belongs to
interface Collection {
  id: number;
  name: string;
  poster_path: string;
  backdrop_path: string;
}

// Define interface for production companies
interface ProductionCompany {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}

// Define interface for production countries
interface ProductionCountry {
  iso_3166_1: string;
  name: string;
}

// Define interface for spoken languages
interface SpokenLanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

export type Movie =
  | {
      backdrop_path: string | null;
      id: number;
      original_title: string;
      overview: string;
      poster_path: string | null;
      media_type: string;
      adult: boolean;
      title: string;
      original_language: string;
      genre_ids: number[];
      popularity: number;
      release_date: string;
      video: boolean;
      vote_average: number;
      vote_count: number;
    }
  | {
      adult: boolean;
      backdrop_path: string;
      belongs_to_collection: Collection | null;
      budget: number;
      genres: Genre[];
      homepage: string;
      id: number;
      imdb_id: string;
      origin_country: string[];
      original_language: string;
      original_title: string;
      overview: string;
      popularity: number;
      poster_path: string;
      production_companies: ProductionCompany[];
      production_countries: ProductionCountry[];
      release_date: string;
      revenue: number;
      runtime: number;
      spoken_languages: SpokenLanguage[];
      status: string;
      tagline: string;
      title: string;
      video: boolean;
      vote_average: number;
      vote_count: number;
    };
