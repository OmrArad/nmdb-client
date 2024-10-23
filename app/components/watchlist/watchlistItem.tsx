"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { IWatchlistItem } from "@/app/types/watchlist";
import { useWatchlist } from "@/app/context/watchlistContext";
import { useRouter } from "next/navigation";
import WatchlistBookmark from "./watchlistBookmark";
import Ratings from "@/app/components/rating/listRating/ratings";
import TrailerButton from "../trailer/trailerButton";
import VideoPopup from "../trailer/videoPopup";

const WatchlistItem = ({ media }: { media: IWatchlistItem }) => {
  const { watchlist, updateWatchlist } = useWatchlist();
  const [isInWatchlist, setIsInWatchlist] = useState(true);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const router = useRouter();

  const { title, poster_path, release_date, overview, tmdb_id, video_links } =
    media;

  const navLink = `/movies/${tmdb_id}`;

  const handleNavigate = () => router.push(navLink);
  const openVideoPopup = () => setIsVideoOpen(true);
  const closeVideoPopup = () => setIsVideoOpen(false);

  return (
    <div className="bg-gray-100 border border-gray-300 rounded-xl overflow-hidden shadow-lg mb-4 relative">
      <div className="md:flex items-start p-4 relative">
        <Image
          src={poster_path || "/images/no-image-available.png"}
          alt={title}
          className="w-24 h-36 mr-4 cursor-pointer transition-transform transform rounded-lg hover:brightness-105 hover:scale-105 duration-300 ease-in-out"
          width={96}
          height={144}
          onClick={handleNavigate}
        />
        <WatchlistBookmark
          mediaId={tmdb_id}
          setIsInWatchlist={setIsInWatchlist}
          updateWatchlist={updateWatchlist}
          watchlist={watchlist}
          isInWatchlist={isInWatchlist}
          shouldShowIcon={false}
        />

        <div className="flex-col">
          <div className="flex-col justify-between mt-4">
            <div className="flex justify-between items-center">
              <div className="flex flex-col">
                <Link
                  href={navLink}
                  className="text-xl font-bold transition-transform transform hover:scale-105"
                >
                  {title}
                </Link>
                <p className="text-gray-400">{release_date}</p>
              </div>
              <Ratings isMovie={true} media={media} />
            </div>
            <p className="text-sm mt-2">{overview}</p>

            {video_links?.length > 0 && (
              <TrailerButton onClick={openVideoPopup} />
            )}
          </div>
        </div>
      </div>

      {isVideoOpen && media.video_links && (
        <VideoPopup videoKey={media.video_links} onClose={closeVideoPopup} />
      )}
    </div>
  );
};

export default WatchlistItem;
