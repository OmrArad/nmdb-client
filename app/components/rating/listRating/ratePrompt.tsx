import React from "react";
import { FaRegStar } from "react-icons/fa";

type RatePromptProps = { showText: boolean };

const RatePrompt: React.FC<RatePromptProps> = ({ showText }) => {
  return (
    <div className="flex justify-center items-center">
      {showText && <span className="font-bold">Rate</span>}
      <div className="text-blue-400 rounded-full p-1">
        <FaRegStar size={15} />
      </div>
    </div>
  );
};

export default RatePrompt;
