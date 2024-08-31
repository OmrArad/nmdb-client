"use client";

import { useState, useRef, useEffect } from "react";

export function TextExpander({
  text,
  initialClampLines = 3,
}: {
  text: string;
  initialClampLines?: number;
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isTruncated, setIsTruncated] = useState(false);
  const textRef = useRef<HTMLParagraphElement>(null);
  const [maxHeight, setMaxHeight] = useState("0px");

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  useEffect(() => {
    const element = textRef.current;
    if (element) {
      const lineHeight = parseInt(
        window.getComputedStyle(element).lineHeight,
        10
      );
      const maxHeightValue = lineHeight * initialClampLines;
      setMaxHeight(`${maxHeightValue}px`);

      if (element.scrollHeight > maxHeightValue) {
        setIsTruncated(true);
      }
    }
  }, [text, initialClampLines]);

  return (
    <div className="relative">
      <p
        ref={textRef}
        className="overflow-hidden duration-300 ease-in-out"
        style={{ maxHeight: isExpanded ? "none" : maxHeight }}
      >
        {text}
      </p>
      {isTruncated && (
        <button
          onClick={toggleExpand}
          className="text-indigo-600 hover:text-indigo-800 mt-2 block"
        >
          {isExpanded ? "Read less" : "Read more"}
        </button>
      )}
    </div>
  );
}
