// Define the structure of TMDB items
export interface TMDBItem {
  tmdb_id: string;
  is_movie: boolean;
}

// Define the details of each streaming service provider
export interface ProviderDetails {
  count: number;
  tmdb_ids: TMDBItem[];
}

// Define the overall structure of streaming services
export interface StreamingServices {
  providers: {
    [providerName: string]: ProviderDetails; // providerName is a string key mapping to ProviderDetails
  };
}

// Adjust the StreamingService type if it's not used directly
export interface StreamingService {
  count: number;
  tmdb_ids: TMDBItem[]; // Adjust types as necessary
}
