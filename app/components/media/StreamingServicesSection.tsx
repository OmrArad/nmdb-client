"use client";
import RegionSelector from './RegionSelector';
import { useRegion } from "@/app/context/RegionProvider";
import Image from 'next/image';

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
  const { region } = useRegion(); // Use global region state
  
  const servicesForRegion = services[region] || [];
  
  return (
    <div className="mt-4">
      <div className="mb-2">
        <h3 className="text-lg font-semibold">Check Streaming Availability:</h3>
        <RegionSelector initialRegion={region} />
      </div>
      
      {region && (
        servicesForRegion.length > 0 ? (
          <div className="flex items-start mt-4">
            <p className="font-bold mr-2 text-lg">Available on:</p>
            <div className="flex overflow-x-auto whitespace-nowrap space-x-4 scrollbar-hide">
              {servicesForRegion.map((service) => (
                <div 
                  key={service.provider_id} 
                  className="inline-block flex flex-col items-center"
                >
                  <Image
                    src={`https://image.tmdb.org/t/p/w200${service.logo_path}`} 
                    alt={service.provider_name ? service.provider_name: "Streaming"} 
                    title={service.provider_name}
                    width={32}
                    height={32}
                    className="h-8 w-auto mb-1"
                  />
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p className="mt-4 text-gray-600">
            No streaming services available in {region}
          </p>
        )
      )}
    </div>
  );
};

export default StreamingServicesSection;