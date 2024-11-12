// Define the type for individual search results
export interface SearchResult {
  adult: boolean;
  backdrop_path: string | null; // Some entries might not have a backdrop image
  genre_ids: number[]; // Array of genre IDs
  media_kind: "movie" | "tv"; // Media can either be 'movie' or 'tv'
  id: number; // Unique identifier for the media
  original_language: string; // Language of the media
  original_title?: string; // Only for movies
  original_name?: string; // Only for TV shows
  overview: string; // Description or overview of the media
  popularity: number; // Popularity score
  poster_path: string | null; // Poster image path, could be null
  release_date?: string; // Only for movies
  first_air_date?: string; // Only for TV shows
  title?: string; // Movie title
  name?: string; // TV show name
  video?: boolean; // Only for movies, if there's a related video
  vote_average: number; // Average vote rating
  vote_count: number; // Number of votes
  origin_country?: string[]; // Only for TV shows, country of origin
  streaming_services: string[]; // Array of streaming services
}

// Type for the API response which contains an array of content (SearchResults)
export interface SearchResponse {
  content: SearchResult[]; // Array of search results
}
