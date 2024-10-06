import React from "react";
import { FaStar } from "react-icons/fa";

interface UserRatingDisplayProps {
  userRating: number;
}

const UserRatingDisplay: React.FC<UserRatingDisplayProps> = ({
  userRating,
}) => {
  return (
    <div className="flex justify-center items-center">
      <span className="font-bold">{userRating}</span>
      <div className="text-blue-400 rounded-full p-1">
        <FaStar size={15} />
      </div>
    </div>
  );
};

export default UserRatingDisplay;
