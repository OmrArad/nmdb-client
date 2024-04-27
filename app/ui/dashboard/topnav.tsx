"use client";
import React from "react";
import Image from "next/image";
import NavLinks from "@/app/ui/dashboard/nav-links";
import { PowerIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import AvatarDropdown from "@/app/components/AvatarDropdown";

export default function TopNav() {
  const [user, setUser] = React.useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);

  const login = () => {
    setUser({ name: "username" });
  };

  const logout = () => {
    setUser(null);
  };

  const handleAvatarClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="flex h-full md:w-full flex-col px-3 py-2 md:px-2">
      <div className="flex grow flex-row justify-between space-x-2 md:flex-row md:space-x-2 ">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md bg-transparent md:block"></div>
        <form>
          {user ? (
            <>
              <div
                onClick={handleAvatarClick}
                className="cursor-pointer flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-50/75 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3"
              >
                <UserCircleIcon className="w-6" />
                {/* <Image
                  src={userImage.jpg}
                  width={2}
                  alt="User avatar"
                  className="rounded-full w-8 h-8"
                /> */}
              </div>
              {isDropdownOpen && <AvatarDropdown onLogoutClick={logout} />}
            </>
          ) : (
            <div>
              <button
                onClick={login}
                className="flex h-[48px] w-max grow items-center justify-center gap-2 rounded-md bg-gray-50/75 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3"
              >
                <UserCircleIcon className="block lg:hidden w-6" />
                <div className="hidden lg:block">Sign Up / Login</div>
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
