import React from "react";
import { FaCheck, FaPlus } from "react-icons/fa";

interface TooltipProps {
  showTooltip: boolean;
  isInWatchlist: boolean;
}

const Tooltip: React.FC<TooltipProps> = ({ showTooltip, isInWatchlist }) => {
  return (
    <>
      {showTooltip &&
        (isInWatchlist ? (
          <div className="absolute bg-yellow-500 text-white text-xs rounded py-1 px-2 ml-1 transform -translate-y-2/3 bg-opacity-90">
            <FaCheck />
          </div>
        ) : (
          <div className="absolute border border-yellow-500 bg-yellow-100 text-black text-xs rounded py-1 px-2 ml-1 transform -translate-y-2/3 bg-opacity-90">
            <FaPlus />
          </div>
        ))}
    </>
  );
};

export default Tooltip;
