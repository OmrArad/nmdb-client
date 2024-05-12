"use client";
import React from "react";
import Link from "next/link";
import { Dropdown } from "flowbite-react";
import { Session } from "next-auth";
import { setAuthTokenAndLogin } from "@/app/api/auth/login";
import styles from "@/app/styles/NavButton.module.css";
import clsx from "clsx";
import UserImage from "./userImage";

const links = [
  {
    name: "Profile",
    href: "/user",
  },
  {
    name: "Watchlist",
    href: "/user/watchlist",
  },
];

const style =
  "block px-4 py-2 w-full text-sm text-gray-700 hover:bg-emerald-100 text-left";

const UserDropdown = ({
  onLogoutClick,
  session,
}: {
  onLogoutClick: () => void;
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
    <Dropdown
      label="User dropdown button"
      dismissOnClick={false}
      renderTrigger={userDropdownTheme}
    >
      <div className="absolute -right-12 -mt-2 w-36 bg-gray-50 rounded-md overflow-hidden shadow-xl z-10 divide-y">
        <div>
          {links.map((link) => {
            return (
              <Dropdown.Item
                as={Link}
                href={link.href}
                key={link.name}
                className={style}
              >
                {link.name}
              </Dropdown.Item>
            );
          })}
        </div>
        <form action={onLogoutClick}>
          <button className={style}>Logout</button>
        </form>
      </div>
    </Dropdown>
  );
};

export default UserDropdown;
