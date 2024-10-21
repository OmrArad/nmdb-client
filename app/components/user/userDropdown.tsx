"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Dropdown } from "flowbite-react";
import { setAuthToken } from "@/app/api/auth/auth";
import styles from "@/app/styles/NavButton.module.css";
import clsx from "clsx";
import UserImage from "./userImage";
import { useWatchlist } from "@/app/context/watchlistContext";
import { useRatings } from "@/app/context/userRatingContext";
import { getRatingsByUser } from "@/app/api/ratings/ratingsServices";
import { useSession } from "next-auth/react";
import { Session } from "next-auth";

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
  _session,
  userData
}: {
  onLogoutClick: () => void;
  _session: Session;
  userData: any, 
}) => {
  const { updateWatchlist } = useWatchlist();
  const { updateRatings } = useRatings();
  const { data: session, status } = useSession();
  const [isUpdated, setIsUpdated] = useState(false);
  React.useEffect(() => {
    const updateContext = async () => {
      updateWatchlist(userData.main_watchlist.Content);
      updateRatings(await getRatingsByUser());
    };

    if (status === "authenticated") {
      setAuthToken(_session?.accessToken);
      setIsUpdated(true);
      if (!isUpdated) updateContext();
    }
  }, [session]);

  const userDropdownTheme = () => {
    return (
      <div className={clsx(styles.base_button, styles.user)}>
        <UserImage image={_session?.user?.image} />
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
