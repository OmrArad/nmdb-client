"use client";
import { Services } from "@/app/types/streaming";
import StreamingServiceCard from "./streamingServiceCard";

interface StreamingServiceListProps {
  services: Services;
  activeServices: string[];
  netflix_price: string
  usa_prices: Record<string, string> | null;
  getGradientColor: (
    count: number,
    minCount: number,
    maxCount: number
  ) => string;
  handleFilterByService: (serviceName: string) => void;
  minCount: number;
  maxCount: number;
}

const StreamingServiceList: React.FC<StreamingServiceListProps> = ({
  services,
  activeServices,
  netflix_price,
  usa_prices,
  getGradientColor,
  handleFilterByService,
  minCount,
  maxCount,
}) => {
  // Sort service keys based on count in descending order
  const sortedServiceNames = Object.keys(services).sort((a, b) => 
    services[b].count - services[a].count
  );

  return (
    <div className="grid grid-flow-col gap-4 overflow-x-auto pb-3 no-scrollbar">
      {sortedServiceNames.map((serviceName) => {
        const service = services[serviceName];
        const isActive = activeServices.includes(serviceName);
        const gradientColor = getGradientColor(
          service.count,
          minCount,
          maxCount
        );

        return (
          <StreamingServiceCard
            key={serviceName}
            serviceName={serviceName}
            count={service.count}
            gradientColor={gradientColor}
            logoSrc={"https://image.tmdb.org/t/p/original/" + service.logo_path}
            isActive={isActive}
            netflix_price={netflix_price}
            usa_prices={usa_prices}
            onClick={() => handleFilterByService(serviceName)}
          />
        );
      })}
    </div>
  );
};

export default StreamingServiceList;