import React, { useState } from "react";
import { FaBookmark, FaRegBookmark, FaCheck, FaPlus } from "react-icons/fa";

interface WatchlistBookmarkProps {
  isInWatchlist: boolean;
  handleAdd: () => void;
  handleRemove: () => void;
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
        {showTooltip &&
          (isInWatchlist ? (
            <div className="absolute bg-yellow-500 text-white text-xs rounded py-1 px-2 ml-1 transform -translate-y-2/3 bg-opacity-90">
              <FaCheck />
            </div>
          ) : (
            <div className="absolute border border-yellow-500 bg-yellow-200 text-black text-xs rounded py-1 px-2 ml-1 transform -translate-y-2/3 bg-opacity-90 ">
              <FaPlus />
            </div>
          ))}
      </>
    );
  };

  return (
    <>
      <div
        className="absolute -top-0.5 left-0 text-yellow-500 cursor-pointer transition-transform transform scale-y-150 duration-300 ease-in-out hover:translate-y-1"
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
