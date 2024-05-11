import React from "react";

const RecommendationsSection = () => {
  return (
    <div className="text-center p-8 text-white flex-1">
      <h2 className="text-2xl font-bold mb-4">Streaming Recommendations.</h2>
      <p className="mb-6">
        Interested to see what we think is your best go-to streaming service?
      </p>
      <button className="hover:bg-gradient-to-br from-red-200 via-red-300 to-yellow-200 group-hover:from-red-200 group-hover:via-red-300 group-hover:to-yellow-200 dark:text-white dark:hover:text-gray-900 focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 mt-2 h-12 hover:text-black font-medium py-2 px-4 rounded-2xl transition duration-300 border hover:border-2 bg-custom-gradient-1">
        Explore Recommendations
      </button>
    </div>
  );
};

export default RecommendationsSection;
