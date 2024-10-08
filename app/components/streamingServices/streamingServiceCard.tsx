"use client";
import { getLogoForService } from "@/app/utils/serviceLogoUtils";
import Image from "next/image";

interface StreamingServiceCardProps {
  serviceName: string;
  count: number;
  gradientColor: string;
  isActive: boolean;
  onClick: () => void;
}

const StreamingServiceCard: React.FC<StreamingServiceCardProps> = ({
  serviceName,
  count,
  gradientColor,
  isActive,
  onClick,
}) => {
  const logoSrc = getLogoForService(serviceName);

  return (
    <div
      onClick={onClick}
      className={`flex justify-around cursor-pointer p-4 border rounded-lg transition transform duration-300 hover:border-blue-500 hover:bg-blue-300 border-gray-300 ${
        isActive ? "bg-blue-500 text-white" : "bg-gray-100"
      }`}
    >
      <div className="flex gap-3 justify-between items-center w-max">
        {logoSrc ? (
          <Image
            src={logoSrc}
            alt={serviceName}
            width={60}
            height={60}
            className="w-max"
          />
        ) : (
          <span className="w-max">{serviceName}</span>
        )}
        {/* Display count as a circle with dynamic gradient color */}
        <div
          className="flex justify-center items-center rounded-full w-8 h-8 text-white border border-gray-400 brightness-90"
          style={{ backgroundColor: gradientColor }}
        >
          {count}
        </div>
      </div>
    </div>
  );
};

export default StreamingServiceCard;
