"use client";
import { FaStream } from "react-icons/fa";
import { useRegion } from "@/app/context/RegionProvider";
import Image from "next/image";

interface StreamingService {
  provider_id?: string;
  provider_name?: string;
  logo_path: string;
}

interface StreamingServices {
  [key: string]: StreamingService[];
}

interface StreamingServicesSectionProps {
  services: StreamingServices;
}

const StreamingServicesSection: React.FC<StreamingServicesSectionProps> = ({ services }) => {
  const { region } = useRegion();
  const servicesForRegion = services[region] || [];
  
  if (!region || servicesForRegion.length === 0) return null;
  
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-1 text-gray-600">
        <span className="text-sm font-medium">Watch on:</span>
      </div>
      <div className="flex items-center gap-2">
        {servicesForRegion.map((service) => (
          <div 
            key={service.provider_id}
            className="flex-shrink-0 group relative"
          >
            <Image
              src={`https://image.tmdb.org/t/p/w200${service.logo_path}`} 
              alt={service.provider_name ? service.provider_name : "Streaming"} 
              className="h-6 w-auto rounded transition-transform hover:scale-110"
            />
            <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded opacity-0 group-hover:opacity-100 whitespace-nowrap transition-opacity z-10">
              {service.provider_name}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StreamingServicesSection;