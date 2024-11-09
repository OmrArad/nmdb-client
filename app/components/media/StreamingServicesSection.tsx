"use client";
import { useState } from 'react';
import RegionSelector from './RegionSelector';

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
  const [selectedRegion, setSelectedRegion] = useState('US');
  
  const servicesForRegion = services[selectedRegion] || [];
  console.log("services for region are" , servicesForRegion);
  
  return (
    <div className="mt-4">
      <div className="mb-2">
        <h3 className="text-lg font-semibold">Check Streaming Availability:</h3>
        <RegionSelector 
          initialRegion={selectedRegion} 
          onRegionChange={setSelectedRegion}
        />
      </div>
      
      {selectedRegion && (
        servicesForRegion.length > 0 ? (
          <div className="flex items-start mt-4"> {/* Changed from items-center to items-start */}
            <p className="font-bold mr-2 text-lg">Available on:</p>
            <div className="flex overflow-x-auto whitespace-nowrap space-x-4 scrollbar-hide"> {/* Increased space-x */}
              {servicesForRegion.map((service) => (
                <div 
                  key={service.provider_id} 
                  className="inline-block flex flex-col items-center"
                >
                  <img 
                    src={`https://image.tmdb.org/t/p/w200${service.logo_path}`} 
                    alt={service.provider_name} 
                    title={service.provider_name}
                    className="h-8 w-auto mb-1" /* Added margin bottom */
                  />
                  {/* Added provider name, currently unused due to bad design */}
                  {/*                   
                  <span className="text-xs text-center text-gray-600">
                    {service.provider_name}
                  </span>
                  */}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p className="mt-4 text-gray-600">
            No streaming services available in {selectedRegion}
          </p>
        )
      )}
    </div>
  );
};

export default StreamingServicesSection;