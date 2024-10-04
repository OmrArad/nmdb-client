import React, { useState } from "react";
import { FaBookmark, FaRegBookmark, FaCheck, FaPlus } from "react-icons/fa";

interface WatchlistBookmarkProps {
  isInWatchlist: boolean; // Determines whether the item is in the watchlist
  handleAdd: () => void; // Function to add the item to the watchlist
  handleRemove: () => void; // Function to remove the item from the watchlist
}

const WatchlistBookmark = ({
  isInWatchlist,
  handleAdd,
  handleRemove,
}: WatchlistBookmarkProps) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleMouseEnter = () => {
    setShowTooltip(true);
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  const Tooltip = () => {
    return (
      <>
        {showTooltip && (
          <div className="absolute bg-yellow-500 text-white text-xs rounded py-1 px-2 ml-2  transform -translate-y-3/4 whitespace-nowrap">
            {isInWatchlist ? <FaCheck /> : <FaPlus />}
          </div>
        )}
      </>
    );
  };

  return (
    <>
      <div
        className="absolute -top-0.5 left-0 text-yellow-500 cursor-pointer transition-transform transform hover:scale-y-150 duration-300 ease-in-out"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {isInWatchlist ? (
          <FaBookmark size={18} onClick={handleRemove} />
        ) : (
          <FaRegBookmark size={18} onClick={handleAdd} />
        )}
      </div>

      <Tooltip />
    </>
  );
};

export default WatchlistBookmark;
