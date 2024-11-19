"use client";
import { getLogoForService } from "@/app/utils/serviceLogoUtils";
import Image from "next/image";
import { BanknotesIcon } from "@heroicons/react/24/outline";

interface StreamingServiceCardProps {
  serviceName: string;
  count: number;
  gradientColor: string;
  isActive: boolean;
  logoSrc?: string;
  netflix_price: string | null;
  usa_prices: Record<string, string> | null;
  onClick: () => void;
}

const StreamingServiceCard: React.FC<StreamingServiceCardProps> = ({
  serviceName,
  count,
  gradientColor,
  isActive,
  logoSrc,
  netflix_price,
  usa_prices,
  onClick,
}) => {
  const logo = getLogoForService(serviceName);
  const finalLogoSrc = logo ?? logoSrc;
  const isDefaultLogo = !logo && logoSrc;

  return (
    <div
      onClick={onClick}
      className={`flex justify-around cursor-pointer p-4 border rounded-lg transition transform duration-300 group relative ${
        isActive
          ? "bg-blue-500 text-white hover:bg-gray-400"
          : "bg-gray-100 hover:border-blue-500 hover:shadow-lg"
      }`}
    >
      <div className="flex gap-3 justify-between items-center w-max">
        {finalLogoSrc ? (
          <div className={`${isDefaultLogo ? "relative w-16 h-16" : ""} group relative`}>
            {logo ? (
              <Image
                src={finalLogoSrc}
                alt={serviceName}
                width={60}
                height={60}
                className="w-max transition-transform hover:scale-110"
              />
            ) : (
              <Image
                src={finalLogoSrc}
                alt={serviceName}
                width={60}
                height={60}
                className="w-max absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 shadow-md transition-transform hover:scale-110"
              />
            )}
            {isDefaultLogo && (
              <div className="absolute inset-0 border-2 border-gray-300" />
            )}
            <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap transition-opacity z-10">
              {serviceName}
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center relative w-16 h-16 group">
            <div className="absolute inset-0 rounded-full border-2 border-gray-300" />
            <span className="text-lg font-semibold transition-transform hover:scale-110">
              {serviceName.substring(0, 2).toUpperCase()}
            </span>
            <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap transition-opacity z-10">
              {serviceName}
            </div>
          </div>
        )}
        <div
          className="flex justify-center items-center rounded-full w-8 h-8 text-black border border-gray-400 brightness-90"
          style={{ backgroundColor: gradientColor }}
        >
          {count}
        </div>

        {/* netflix_price for Netflix */}
        { serviceName == "Netflix" && netflix_price && (
          <div className="absolute bottom-2 left-2 flex items-center bg-gray-200/70 rounded-full px-2 py-1 text-xs">
            <BanknotesIcon className="mr-1 h-4 w-4 text-gray-600" />
            <span className="font-medium text-gray-700">{netflix_price}/mo</span>
          </div>
        )}

        {/* USA Prices. Only display if the region is 'US' (if not US then usa_prices will be null) */}
        {serviceName !== "Netflix" && usa_prices && (() => {
  // Normalize the serviceName to match the key format in `usa_prices`
  const normalizedServiceName = serviceName.replace(/\bPlus\b/i, "+");

  // Check if a matching price exists in `usa_prices`
        if (usa_prices[normalizedServiceName]) {
          return (
            <div className="absolute bottom-2 left-2 flex items-center bg-gray-200/70 rounded-full px-2 py-1 text-xs">
              <BanknotesIcon className="mr-1 h-4 w-4 text-gray-600" />
              <span className="font-medium text-gray-700">${usa_prices[normalizedServiceName]}/mo</span>
            </div>
          );
        }
        return null; // Return nothing if no price is found
      })()}
      </div>
    </div>
  );
};

export default StreamingServiceCard;