import SearchSection from "./components/home/search/searchSection";
import RecommendationsSection from "./components/home/recommendations/RecommendationsSection";
import TrendingSection from "./components/home/trending/trendingSection";
import { SessionProvider } from "next-auth/react";
import { Session } from "next-auth";
import { RatingsProvider } from "./context/userRatingContext";
export default function Home({
  params: { session },
}: {
  params: { session: Session };
}) {
  return (
    <>
      <div className="flex md:flex-row flex-col">
        <RatingsProvider>
          <main className="flex flex-1 flex-col h-full items-strech md:w-2/3">
            <section className="flex flex-col justify-between md:flex-row">
              <SessionProvider session={session}>
                <SearchSection />
              </SessionProvider>
              <RecommendationsSection />
            </section>
            <TrendingSection />
          </main>
        </RatingsProvider>
      </div>
    </>
  );
}
