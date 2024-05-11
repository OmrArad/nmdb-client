"use client";
import React from "react";
import { Session } from "next-auth";
import UserImage from "./userImage";
import { setAuthTokenAndLogin } from "@/app/api/auth/login";
import styles from "@/app/styles/NavButton.module.css";
import clsx from "clsx";
import DropdownComponent from "../DropdownComponent";

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

  const customTheme = () => {
    return (
      <div className={clsx(styles.base_button, styles.user)}>
        <UserImage session={session} />
      </div>
    );
  };

  return (
    <DropdownComponent
      onLogoutClick={handleLogout}
      dropdownTheme={customTheme}
    />
  );
};

export default UserAvatar;
