"use client";
import StreamingServiceCard from "./streamingServiceCard";

interface StreamingServiceListProps {
  services: any;
  activeService: string | null;
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
  activeService,
  getGradientColor,
  handleFilterByService,
  minCount,
  maxCount,
}) => {
  return (
    <div className="grid grid-flow-col gap-4 overflow-x-auto pb-3 no-scrollbar">
      {Object.keys(services).map((serviceName) => {
        const service = services[serviceName];
        const isActive = activeService === serviceName;
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
            isActive={isActive}
            onClick={() => handleFilterByService(serviceName)}
          />
        );
      })}
    </div>
  );
};

export default StreamingServiceList;
