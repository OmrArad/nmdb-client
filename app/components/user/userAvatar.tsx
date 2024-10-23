"use client";
import React from "react";
import { Session } from "next-auth";
import UserDropdown from "./userDropdown";
import { UserData } from "@/app/types/auth";

const UserAvatar = ({
  handleLogout,
  session,
  userData,
}: {
  handleLogout: () => void;
  session: Session;
  userData: UserData;
}) => {
  return (
    <UserDropdown
      onLogoutClick={handleLogout}
      _session={session}
      userData={userData}
    />
  );
};

export default UserAvatar;
