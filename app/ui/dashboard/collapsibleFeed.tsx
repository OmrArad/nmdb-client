"use client";

import React from "react";
import { ChatBubbleLeftRightIcon } from "@heroicons/react/24/outline";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import Feed from "@/app/components/Feed";
import styles from "@/app/styles/NavButton.module.css";

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
        className={clsx(styles.base_button, styles.feed, {
          [styles.active_nav]: pathname === feedDropdown.href,
        })}
        onClick={handleFeedClick}
      >
        <LinkIcon className="w-6" />
        <p className="hidden">{feedDropdown.name}</p>
      </button>
      {isFeedOpen && <Feed />}
    </>
  );
}
