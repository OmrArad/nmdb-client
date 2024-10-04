import { SessionProvider } from "next-auth/react";
import MainWatchlist from "./mainWatchlist";

const Watchlist = () => {
  return (
    <div className="flex container mx-auto my-2 py-4 md:px-16">
      <SessionProvider>
        <MainWatchlist />
      </SessionProvider>
    </div>
  );
};

export default Watchlist;
