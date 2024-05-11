"use client";
import React from "react";
import { Session } from "next-auth";
import UserDropdown from "./userDropdown";

const UserAvatar = ({
  handleLogout,
  session,
}: {
  handleLogout: () => void;
  session: Session;
}) => {
  return <UserDropdown onLogoutClick={handleLogout} session={session} />;
};

export default UserAvatar;
