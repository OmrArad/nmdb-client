// trailerButtonClient.tsx (Client Component)
"use client";
import { useState } from "react";
import VideoPopup from "./videoPopup";
import TrailerButton from "./trailerButton";

interface TrailerButtonProps {
  videoKey: string[];
}

const TrailerButtonClientWrapper: React.FC<TrailerButtonProps> = ({
  videoKey,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const openVideoPopup = () => setIsOpen(true);
  const closeVideoPopup = () => setIsOpen(false);

  return (
    <>
      <TrailerButton onClick={openVideoPopup} />

      {isOpen && videoKey && (
        <VideoPopup videoKey={videoKey} onClose={closeVideoPopup} />
      )}
    </>
  );
};

export default TrailerButtonClientWrapper;
