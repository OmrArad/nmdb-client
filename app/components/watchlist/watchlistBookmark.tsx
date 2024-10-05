import { IWatchlist } from "@/app/types/watchlist";
import React, { SetStateAction, useState } from "react";
import { FaBookmark, FaCheck, FaPlus } from "react-icons/fa";
import {
  handleAddToWatchlist,
  handleRemoveFromWatchlist,
} from "../../utils/watchlistUtils";
import Tooltip from "./tooltip/tooltip";

interface WatchlistBookmarkProps {
  isInWatchlist: boolean;
  watchlist: IWatchlist | null;
  updateWatchlist: (watchlist: IWatchlist) => void;
  mediaId: string;
  setIsInWatchlist: (value: SetStateAction<boolean>) => void;
  shouldShowTooltip?: boolean;
  shouldShowIcon?: boolean;
}

const Plus = () => (
  <div className="z-10 absolute top-1.5 left-1.5 text-xs text-gray-900 transform">
    <FaPlus size={10} />
  </div>
);

const Check = () => (
  <div className="z-10 absolute top-1.5 left-1.5 text-xs text-gray-900 transform">
    <FaCheck size={10} />
  </div>
);

const WatchlistBookmark = ({
  isInWatchlist,
  watchlist,
  updateWatchlist,
  mediaId,
  setIsInWatchlist,
  shouldShowTooltip = false,
  shouldShowIcon = true,
}: WatchlistBookmarkProps) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleMouseEnter = () => {
    setShowTooltip(true);
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  const handleRemove = () =>
    handleRemoveFromWatchlist(
      watchlist!,
      updateWatchlist,
      mediaId,
      setIsInWatchlist
    );

  const handleAdd = () =>
    handleAddToWatchlist(
      watchlist!,
      updateWatchlist,
      mediaId,
      setIsInWatchlist
    );

  const handleClick = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();

    if (isInWatchlist) {
      handleRemove();
    } else {
      handleAdd();
    }
  };

  const bookmarkSize = shouldShowIcon ? 22 : 18;

  return (
    <>
      <div
        className="absolute top-0 left-0 text-yellow-400 cursor-pointer transition-transform transform  duration-300 ease-in-out "
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
      >
        {isInWatchlist ? (
          <div className="transition-transform transform duration-300 ease-in-out hover:-translate-y-0.5 hover:text-gray-400 ">
            <FaBookmark size={bookmarkSize} className=" scale-y-150" />
            {shouldShowIcon && (showTooltip ? <Plus /> : <Check />)}
          </div>
        ) : (
          <div className="relative text-gray-400  transition-transform transform duration-300 ease-in-out -translate-y-0.5 hover:translate-y-0.5 hover:text-yellow-400">
            <FaBookmark size={bookmarkSize} className=" scale-y-150" />
            {shouldShowIcon && (showTooltip ? <Check /> : <Plus />)}
          </div>
        )}
      </div>

      {shouldShowTooltip && (
        <Tooltip showTooltip={showTooltip} isInWatchlist={isInWatchlist} />
      )}
    </>
  );
};

export default WatchlistBookmark;
