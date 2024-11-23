"use client";
import React, { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import { Dropdown } from "flowbite-react";
import { setAuthToken } from "@/app/api/auth/auth";
import styles from "@/app/styles/NavButton.module.css";
import clsx from "clsx";
import UserImage from "./userImage";
import { useWatchlist } from "@/app/context/watchlistContext";
import { useRatings } from "@/app/context/userRatingContext";
import { useSession } from "next-auth/react";
import { Session } from "next-auth";
import { UserData } from "@/app/types/auth";
import { useRegion } from "@/app/context/RegionProvider";

const links = [
  {
    name: "Watchlist",
    href: "/user/watchlist",
  },
  {
    name: "Ratings",
    href: "/user/ratings",
  },
  {
    name: "Recommendations",
    href: "/user/recommendations",
  },
];

const style =
  "block px-4 py-2 w-full text-sm text-gray-700 hover:bg-emerald-100 text-left";

const UserDropdown = ({
  onLogoutClick,
  _session,
  userData,
}: {
  onLogoutClick: () => void;
  _session: Session;
  userData: UserData;
}) => {
  const { updateWatchlist } = useWatchlist();
  const { updateRatings } = useRatings();
  const { updateRegionLocally } = useRegion();
  const { data: session, status } = useSession();
  const [isUpdated, setIsUpdated] = useState(false);

  // Split the update logic into separate effects for better maintainability
  const updateContext = useCallback(async () => {
    if (!isUpdated) {
      console.log("ratings: ", userData.ratings_list);
      updateWatchlist(userData.main_watchlist.Content);
      updateRatings(userData.ratings_list.Content);
      updateRegionLocally(userData.region);
      setIsUpdated(true);
    }
  }, [
    isUpdated,
    userData.ratings_list,
    userData.main_watchlist.Content,
    userData.region,
    updateWatchlist,
    updateRatings,
    updateRegionLocally,
  ]);

  // Handle authentication and token setting
  useEffect(() => {
    if (status === "authenticated" && _session?.accessToken) {
      setAuthToken(_session.accessToken);
    }
  }, [status, _session?.accessToken]);

  // Handle context updates
  useEffect(() => {
    if (status === "authenticated") {
      updateContext();
    }
  }, [status, updateContext]);

  const userDropdownTheme = useCallback(() => {
    return (
      <div className={clsx(styles.base_button, styles.user)}>
        <UserImage image={_session?.user?.image} />
      </div>
    );
  }, [_session?.user?.image]);

  return (
    <Dropdown
      label="User dropdown button"
      dismissOnClick={false}
      renderTrigger={userDropdownTheme}
    >
      <div className="absolute -right-12 -mt-2 w-36 bg-gray-50 rounded-md overflow-hidden shadow-xl z-10 divide-y">
        <div>
          {links.map((link) => (
            <Dropdown.Item
              as={Link}
              href={link.href}
              key={link.name}
              className={style}
            >
              {link.name}
            </Dropdown.Item>
          ))}
        </div>
        <form action={onLogoutClick}>
          <button type="submit" className={style}>
            Logout
          </button>
        </form>
      </div>
    </Dropdown>
  );
};

export default UserDropdown;