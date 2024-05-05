"use client";
import React from "react";
import AvatarDropdown from "../AvatarDropdown";
import { Session } from "next-auth";
import UserAvatar from "./userAvatar";
import { setAuthToken } from "@/app/api/watchlist/watchlistServices";
import { AdapterSession } from "next-auth/adapters";

const Avatar = ({
  handleLogout,
  session,
}: {
  handleLogout?: () => void;
  session: Session | null;
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  const handleAvatarClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  React.useEffect(() => {
    setAuthToken(session?.accessToken);
  }, [session?.accessToken]);

  return (
    <>
      <div
        onClick={handleAvatarClick}
        className="cursor-pointer flex h-[48px] w-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50/75 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:p-2 md:px-3"
      >
        <UserAvatar session={session} />
      </div>
      {isDropdownOpen && <AvatarDropdown onLogoutClick={handleLogout} />}
    </>
  );
};

export default Avatar;
