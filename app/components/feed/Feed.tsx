import mockFeedData from "@/app/data/feed.json";
import { parseContent } from "@/app/utils/parseFeedContent";

export type FeedData = {
  id: number;
  user: string;
  timestamp: string;
  content: string;
};

const Feed = ({ feedData = mockFeedData }: { feedData?: FeedData[] }) => {
  return (
    <div className="absolute -right-28 -mt-2 bg-white rounded-lg overflow-hidden shadow-xl z-10">
      <aside className="w-80 z-0 border-2 right-3 border-purple-200 rounded-lg shadow-md p-4 flex flex-col space-y-4 max-h-[90vh]">
        <h2 className="text-lg font-bold text-gray-800 border-b pb-2">
          The Movie and TV show feed!
        </h2>
        <div className="mb-auto">
          <button className="hover:bg-custom-gradient-1 hover:text-white py-2 px-4 rounded-lg w-full hover:bg-purple-900 transition duration-300 border">
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
