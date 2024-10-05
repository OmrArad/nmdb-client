import React, { useState } from "react";
import { FaBookmark, FaCheck, FaPlus } from "react-icons/fa";

interface WatchlistBookmarkProps {
  isInWatchlist: boolean;
  handleAdd: () => void;
  handleRemove: () => void;
  shouldShowTooltip?: boolean;
  shouldShowIcon?: boolean;
}

const WatchlistBookmark = ({
  isInWatchlist,
  handleAdd,
  handleRemove,
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

      {shouldShowTooltip && <Tooltip />}
    </>
  );
};

export default WatchlistBookmark;
