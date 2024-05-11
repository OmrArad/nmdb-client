"use client";
import React from "react";
import { Session } from "next-auth";
import UserImage from "./userImage";
import { setAuthTokenAndLogin } from "@/app/api/auth/login";
import styles from "@/app/styles/NavButton.module.css";
import clsx from "clsx";
import UserDropdown from "../userDropdown";

const UserAvatar = ({
  handleLogout,
  session,
}: {
  handleLogout: () => void;
  session: Session;
}) => {
  React.useEffect(() => {
    setAuthTokenAndLogin(session?.accessToken);
  }, [session?.accessToken]);

  const userDropdownTheme = () => {
    return (
      <div className={clsx(styles.base_button, styles.user)}>
        <UserImage session={session} />
      </div>
    );
  };

  return (
    <UserDropdown
      onLogoutClick={handleLogout}
      dropdownTheme={userDropdownTheme}
    />
  );
};

export default UserAvatar;
