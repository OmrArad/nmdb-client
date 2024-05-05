"use client";

import React from "react";
import { ChatBubbleLeftRightIcon } from "@heroicons/react/24/outline";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import Feed from "@/app/components/Feed";

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const feedDropdown = {
  name: "Feed",
  href: "/feed",
  icon: ChatBubbleLeftRightIcon,
};

export default function CollapsibleFeed() {
  const pathname = usePathname();
  const LinkIcon = feedDropdown.icon;
  const [isFeedOpen, setIsFeedOpen] = React.useState(false);
  const handleFeedClick = () => {
    setIsFeedOpen(!isFeedOpen);
  };
  return (
    <>
      <button
        className={clsx(
          "flex h-[48px] grow items-center justify-center gap-2 rounded-full bg-gray-50/75 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3",
          { "bg-sky-100 text-blue-600": pathname === feedDropdown.href }
        )}
        onClick={handleFeedClick}
      >
        <LinkIcon className="w-6" />
        <p className="hidden">{feedDropdown.name}</p>
      </button>
      {isFeedOpen && <Feed />}
    </>
  );
}
