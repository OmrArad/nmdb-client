import React from "react";
import { SearchResult } from "@/app/types/search";
import SingleSearchResult from "./singleSearchResults";

type SearchResultsProps = {
  results: SearchResult[];
};

const SearchResults: React.FC<SearchResultsProps> = ({ results }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 pb-6">
      {results.map((result) => (
        <SingleSearchResult key={result.id} result={result} />
      ))}
    </div>
  );
};

export default SearchResults;
