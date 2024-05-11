"use client";

import { UserGroupIcon, TvIcon, FilmIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import styles from "@/app/styles/NavButton.module.css";

const links = [
  {
    name: "Movies",
    href: "/movies",
    icon: FilmIcon,
  },
  {
    name: "Tv-Shows",
    href: "/tv-shows",
    icon: TvIcon,
  },
  { name: "Actors", href: "/actors", icon: UserGroupIcon },
];

export default function NavLinks() {
  const pathname = usePathname();
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <Link
            key={link.name}
            href={link.href}
            className={clsx(styles.base_button, {
              [styles.active_nav]: pathname === link.href,
            })}
          >
            <LinkIcon className="w-6" />
            <p className="hidden lg:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
