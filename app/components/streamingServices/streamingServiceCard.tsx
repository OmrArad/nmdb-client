"use client";

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
  return (
    <div
      onClick={onClick}
      className={`cursor-pointer p-4 border rounded-lg transition transform duration-300 hover:border-blue-500 hover:bg-blue-300 border-gray-300 ${
        isActive ? "bg-blue-500 text-white" : "bg-gray-100"
      }`}
    >
      <div className="flex gap-2 justify-between items-center">
        <span className="w-max">{serviceName}</span>
        {/* Display count as a circle with dynamic gradient color */}
        <div
          className="flex justify-center items-center rounded-full w-7 h-7 text-white border border-gray-400 brightness-90"
          style={{ backgroundColor: gradientColor }}
        >
          {count}
        </div>
      </div>
    </div>
  );
};

export default StreamingServiceCard;
