import React from "react";

const RecommendationsSection = () => {
  return (
    <div className="bg-purple-700 text-center p-8 text-white flex-1">
      <h2 className="text-2xl font-bold mb-4">Streaming Recommendations.</h2>
      <p className="mb-6">
        Interested to see what we think is your best go-to streaming service?
      </p>
      <button className="bg-white text-purple-700 font-bold py-2 px-4 rounded-full hover:bg-purple-200 transition duration-300">
        Explore Recommendations
      </button>
    </div>
  );
};

export default RecommendationsSection;
