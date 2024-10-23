import { FaYoutube } from "react-icons/fa";

interface TrailerButtonProps {
  onClick: () => void;
}

const TrailerButton: React.FC<TrailerButtonProps> = ({ onClick }) => (
  <button
    onClick={onClick}
    className="flex gap-2 mt-2 text-red-500 text-sm font-bold px-0.5 py-0.5 rounded-lg hover:scale-110 transition"
  >
    <FaYoutube size={20} color="red" />
    Watch Trailer
  </button>
);

export default TrailerButton;
