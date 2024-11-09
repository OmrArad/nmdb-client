// Define the structure of TMDB items
export interface TMDBItem {
  tmdb_id: string;
  is_movie: boolean;
}

// Define the overall structure of streaming services
export interface StreamingServices {
  providers: {
    [providerName: string]: StreamingService; // providerName is a string key mapping to ProviderDetails
  };
}

export type Services = {
  [providerName: string]: StreamingService;
};

// Adjust the StreamingService type if it's not used directly
export interface StreamingService {
  count: number;
  tmdb_ids: TMDBItem[]; // Adjust types as necessary
}

// Define the structure of the streaming service data
export interface StreamingServiceData {
  display_priority: number;
  logo_path: string;
  provider_name: string;
  provider_id: number;
}