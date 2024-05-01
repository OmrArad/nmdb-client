import SearchSection from "./ui/home/searchSection";
import RecommendationsSection from "./ui/home/RecommendationsSection";
import TrendingMoviesSection from "./ui/home/trendingMoviesSection";
import TrendingTvSection from "./ui/home/trendingTvSection";
import CollapsibleFeed from "./components/CollapsibleFeed";
import Toolbar from "./ui/toolbar/toolbar";

export default function Home() {
  return (
    <>
      <Toolbar />
      <div className="flex h-full flex-col md:flex-row md:overflow-hidden">
        <div className="flex-grow p-6 md:overflow-y-auto md:px-0 pb-0">
          <div className="flex md:flex-row flex-col">
            <main className="flex flex-1 flex-col h-full items-strech md:w-2/3">
              <section className="flex flex-col justify-between md:flex-row">
                <SearchSection />
                <RecommendationsSection />
              </section>
              <TrendingMoviesSection />
              <TrendingTvSection />
            </main>
            <CollapsibleFeed />
          </div>
        </div>
      </div>
    </>
  );
}
