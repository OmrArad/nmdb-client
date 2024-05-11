"use client";
import React from "react";
import AvatarDropdown from "../AvatarDropdown";
import { Session } from "next-auth";
import UserAvatar from "./userAvatar";
import { setAuthTokenAndLogin } from "@/app/api/auth/login";
import styles from "@/app/styles/NavButton.module.css";
import clsx from "clsx";

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
    setAuthTokenAndLogin(session?.accessToken);
  }, [session?.accessToken]);

  return (
    <>
      <div
        onClick={handleAvatarClick}
        className={clsx(styles.base_button, styles.user)}
      >
        <UserAvatar session={session} />
      </div>
      {isDropdownOpen && <AvatarDropdown onLogoutClick={handleLogout} />}
    </>
  );
};

export default Avatar;
