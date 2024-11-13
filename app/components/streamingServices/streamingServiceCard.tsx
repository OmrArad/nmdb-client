"use client";
import { getLogoForService } from "@/app/utils/serviceLogoUtils";
import Image from "next/image";

interface StreamingServiceCardProps {
  serviceName: string;
  count: number;
  gradientColor: string;
  isActive: boolean;
  logoSrc?: string;
  price: string | null;  // Price is optional
  onClick: () => void;
}

const StreamingServiceCard: React.FC<StreamingServiceCardProps> = ({
  serviceName,
  count,
  gradientColor,
  isActive,
  logoSrc,
  price,
  onClick,
}) => {
  const logo = getLogoForService(serviceName);
  const finalLogoSrc = logo ?? logoSrc;
  const isDefaultLogo = !logo && logoSrc;

  return (
    <div
      onClick={onClick}
      className={`flex justify-around cursor-pointer p-4 border rounded-lg transition transform duration-300 hover:border-blue-500 hover:shadow-lg border-gray-300 ${
        isActive
          ? "bg-blue-500 text-white hover:border-gray-300 hover:bg-gray-400"
          : "bg-gray-100"
      }`}
      onMouseEnter={() => (isActive ? "bg-gray-400" : "")}
    >
      <div className="flex gap-3 justify-between items-center w-max">
        {finalLogoSrc ? (
          <div className={isDefaultLogo ? "relative w-16 h-16" : ""}>
            <Image
              src={finalLogoSrc}
              alt={serviceName}
              width={60}
              height={60}
              className={`w-max ${
                isDefaultLogo
                  ? "absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full p-2 bg-white shadow-md"
                  : ""
              }`}
            />
            {isDefaultLogo && (
              <div className="absolute inset-0 rounded-full border-2 border-gray-300" />
            )}
          </div>
        ) : (
          <div className="flex items-center justify-center relative w-16 h-16">
            <div className="absolute inset-0 rounded-full border-2 border-gray-300" />
            <span className="text-lg font-semibold">
              {serviceName.substring(0, 2).toUpperCase()}
            </span>
          </div>
        )}
        <div
          className="flex justify-center items-center rounded-full w-8 h-8 text-black border border-gray-400 brightness-90"
          style={{ backgroundColor: gradientColor }}
        >
          {count}
        </div>
      </div>

      {/* Conditionally display price */}
      {price != null && (
        <div className="mt-2 text-sm text-gray-700">
          Price: ${price}
        </div>
      )}
    </div>
  );
};

export default StreamingServiceCard;
