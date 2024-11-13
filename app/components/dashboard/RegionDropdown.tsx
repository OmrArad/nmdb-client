"use client";
import {  GlobeAltIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";
import RegionSelector from "../media/RegionSelector";
import styles from "@/app/styles/NavButton.module.css";
import { Dropdown, DropdownItem } from "flowbite-react";

const customTheme = () => {
  const LinkIcon = GlobeAltIcon;
  return (
    <div className={clsx(styles.base_button, styles.feed)}>
      <LinkIcon className="w-6" />
    </div>
  );
};

export default function RegionDropdown() {
  return (
    <Dropdown
      label="Feed dropdown button"
      dismissOnClick={false}
      renderTrigger={customTheme}
    >
      <DropdownItem as={RegionSelector} initialRegion={""}></DropdownItem>
    </Dropdown>
  );
}
