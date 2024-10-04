import React, { useState } from "react";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";

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
  const [isHovered, setisHovered] = useState(false);

  const handleMouseEnter = () => {
    setisHovered(true);
  };

  const handleMouseLeave = () => {
    setisHovered(false);
  };

  return (
    <div
      className="absolute -top-0.5 left-0 text-yellow-500 cursor-pointer "
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {isInWatchlist ? (
        isHovered ? (
          <FaRegBookmark size={18} onClick={handleRemove} />
        ) : (
          <FaBookmark size={18} onClick={handleAdd} />
        )
      ) : isHovered ? (
        <FaBookmark size={18} onClick={handleAdd} />
      ) : (
        <FaRegBookmark size={18} onClick={handleRemove} />
      )}
    </div>
  );
};

export default WatchlistBookmark;
