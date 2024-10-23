interface VideoPopupProps {
  videoKey: string[];
  onClose: () => void;
}

const VideoPopup: React.FC<VideoPopupProps> = ({ videoKey, onClose }) => (
  <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
    <div className="relative w-[90%] max-w-2xl">
      <button
        onClick={onClose}
        className="absolute -top-10 -right-0.5 text-white text-xl rounded-full p-0.5 hover:scale-150"
      >
        &times;
      </button>
      <iframe
        width="100%"
        height="315"
        src={`https://www.youtube.com/embed/${videoKey}`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  </div>
);

export default VideoPopup;
