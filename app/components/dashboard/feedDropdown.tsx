"use client";
import { ChatBubbleLeftRightIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import Feed from "@/app/components/feed/Feed";
import styles from "@/app/styles/NavButton.module.css";
import { Dropdown, DropdownItem } from "flowbite-react";

const customTheme = () => {
  const LinkIcon = ChatBubbleLeftRightIcon;
  return (
    <div className={clsx(styles.base_button, styles.feed)}>
      <LinkIcon className="w-6" />
    </div>
  );
};

export default function FeedDropdown() {
  return (
    <Dropdown
      label="Feed dropdown button"
      dismissOnClick={false}
      renderTrigger={customTheme}
    >
      <DropdownItem as={Feed}></DropdownItem>
    </Dropdown>
  );
}
