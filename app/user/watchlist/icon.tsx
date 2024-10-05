import React from "react";
import { IconType } from "react-icons";

interface IconProps {
  Icon: IconType; // This type is used for Font Awesome or any other icons from react-icons
  size?: number; // Optional size prop, default can be set
  className?: string; // Optional className prop for additional styling
}

const Icon: React.FC<IconProps> = ({
  Icon,
  size = 10,
  className = "text-gray-900",
}) => {
  return (
    <div
      className={`z-10 absolute top-1.5 left-1.5 text-xs transform ${className}`}
    >
      <Icon size={size} />
    </div>
  );
};

export default Icon;
