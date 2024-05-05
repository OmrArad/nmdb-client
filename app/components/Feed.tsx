import React from "react";
import mockFeedData from "@/app/data/feed.json";

export type FeedData = {
  id: number;
  user: string;
  timestamp: string;
  content: string;
};

const parseContent = (content: string) => {
  // Split the content by spaces while keeping the punctuation with the words
  const words = content.split(/(\s+)/);

  // Map through the words and return either a highlighted span or plain text
  return words.map((word, index) => {
    const key = `${word}-${index}`;
    if (word.startsWith("@") || word.startsWith("#")) {
      return (
        <span
          key={key}
          className="text-blue-500 hover:text-blue-600 cursor-pointer"
        >
          {word}
        </span>
      );
    }
    return word;
  });
};

const Feed = ({ feedData = mockFeedData }: { feedData?: FeedData[] }) => {
  // const feedData: Array<FeedData> = mockFeedData
  return (
    <div className="absolute right-3 mt-16 bg-white rounded-lg overflow-hidden shadow-xl z-10">
      <aside className="w-80 z-0 bg-white border-2 border-purple-700 rounded-lg shadow-md p-4 flex flex-col space-y-4 max-h-[90vh]">
        <h2 className="text-lg font-bold text-gray-800 border-b pb-2">
          The Movie and TV show feed!
        </h2>
        <div className="mb-auto">
          <button className="bg-purple-600 text-white py-2 px-4 rounded-lg w-full hover:bg-purple-700 transition duration-300">
            Login to post in the feed
          </button>
        </div>
        <div className="feed-items-container overflow-y-auto max-h-[calc72vh)]">
          {feedData.map((item) => (
            <div key={item.id} className="feed-item mb-4 last:mb-0">
              <div className="feed-item-header flex justify-between items-center mb-2">
                <span className="font-semibold">{item.user}</span>
                <span className="text-sm text-gray-500">{item.timestamp}</span>
              </div>
              <div className="feed-item-content text-gray-800">
                {parseContent(item.content)}
              </div>
            </div>
          ))}
        </div>
      </aside>
    </div>
  );
};

export default Feed;
