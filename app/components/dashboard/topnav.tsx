import React from "react";
import NavLinks from "@/app/components/dashboard/nav-links";
import UserButton from "@/app/components/user/userButton";
import RegionDropdown from "./RegionDropdown";

export default function TopNav() {
  return (
    <div className="flex h-full md:w-full flex-col px-3 py-2 md:px-2">
      <div className="flex grow flex-row justify-between space-x-2 md:flex-row md:space-x-2  ">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md bg-transparent md:block"></div>
        <RegionDropdown />
        <UserButton />
      </div>
    </div>
  );
}
