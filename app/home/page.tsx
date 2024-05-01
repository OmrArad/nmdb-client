import SearchSection from "../ui/home/searchSection";
import RecommendationsSection from "../ui/home/RecommendationsSection";
import TrendingMoviesSection from "../ui/home/trendingMoviesSection";
import TrendingTvSection from "../ui/home/trendingTvSection";
import CollapsibleFeed from "../components/CollapsibleFeed";

export default function Home() {
  return (
    <div className="flex h-auto md:flex-row flex-col">
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
  );
}
