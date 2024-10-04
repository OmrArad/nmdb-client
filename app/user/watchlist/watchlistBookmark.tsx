import React, { useState } from "react";
import { FaBookmark, FaRegBookmark, FaCheck, FaPlus } from "react-icons/fa";

interface WatchlistBookmarkProps {
  isInWatchlist: boolean;
  handleAdd: () => void;
  handleRemove: () => void;
  shouldShowTooltip?: boolean;
}

const WatchlistBookmark = ({
  isInWatchlist,
  handleAdd,
  handleRemove,
  shouldShowTooltip = false,
}: WatchlistBookmarkProps) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleMouseEnter = () => {
    setShowTooltip(true);
  };

  const handleMouseLeave = () => {
    setShowTooltip(false);
  };

  const handleClick = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();

    if (isInWatchlist) {
      handleRemove();
    } else {
      handleAdd();
    }
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
            <div className="absolute border border-yellow-500 bg-yellow-100 text-black text-xs rounded py-1 px-2 ml-1 transform -translate-y-2/3 bg-opacity-90 ">
              <FaPlus />
            </div>
          ))}
      </>
    );
  };

  return (
    <>
      <div
        className="absolute top-0 left-0 text-yellow-400 cursor-pointer transition-transform transform scale-y-150 duration-300 ease-in-out "
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
      >
        {isInWatchlist ? (
          <FaBookmark
            size={18}
            className="hover:text-gray-400 transition-transform transform duration-300 ease-in-out hover:-translate-y-0.5"
          />
        ) : (
          <FaBookmark
            size={18}
            className="text-gray-400 hover:text-yellow-400 transition-transform transform duration-300 ease-in-out -translate-y-0.5 hover:translate-y-0.5"
          />
        )}
      </div>

      {shouldShowTooltip && <Tooltip />}
    </>
  );
};

export default WatchlistBookmark;
