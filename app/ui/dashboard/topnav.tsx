import React from "react";
import Image from "next/image";
import NavLinks from "@/app/ui/dashboard/nav-links";
import { PowerIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import AvatarDropdown from "@/app/components/AvatarDropdown";
import { signOut } from "next-auth/react";
import { auth } from "@/auth";
import UserAvatar from "@/app/components/login/userAvatar";
import { SignIn } from "@/app/components/login/signIn";
import LoginLink from "@/app/components/login/loginLink";

export default function TopNav() {
  return (
    <div className="flex h-full md:w-full flex-col px-3 py-2 md:px-2">
      <div className="flex grow flex-row justify-between space-x-2 md:flex-row md:space-x-2 ">
        <NavLinks />
        <div className="hidden h-auto w-full grow rounded-md bg-transparent md:block"></div>
        <LoginLink />
      </div>
    </div>
  );
}
