import { DetailedTVSeries } from "./tvShow";
import { DetailedMovie } from "./movie";

export interface TVRecommendations extends DetailedTVSeries {
    recommended_by: string;
    trailer: string;
}

export interface MovieRecommendations extends DetailedMovie {
    recommended_by: string;
    trailer: string;
}


export interface Recommendation extends DetailedMovie {
    recommended_by: string;
    trailer: string;
}