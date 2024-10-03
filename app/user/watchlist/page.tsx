import { SessionProvider } from "next-auth/react";
import MainWatchlist from "./mainWatchlist";

const Watchlist = () => {
  return (
    <div className="container mx-auto my-2 py-4 px-16">
      <SessionProvider>
        <MainWatchlist />
      </SessionProvider>
    </div>
  );
};

export default Watchlist;
