"use client";

import { UserGroupIcon, TvIcon, FilmIcon } from "@heroicons/react/24/outline";
import { CgClapperBoard } from "react-icons/cg";
const links = [
  {
    name: "Movies",
    icon: FilmIcon,
  },
  {
    name: "TV",
    icon: TvIcon,
  },
  { 
    name: "Streaming", 
    icon: CgClapperBoard
  },
];

export default function NavDesignElements() {
  return (
    <div className="flex items-center space-x-6">
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          <div 
            key={link.name} 
            className="flex items-center"
          >
            <LinkIcon className="w-5 h-5 mr-2" color = "#78f3d6" />
            <span className="text-lg tracking-tight font-medium bg-clip-text text-transparent bg-gradient-to-r from-[#78f3d6] to-[#68f3d6] bg-gradient-to-r">
              {link.name}
            </span>
          </div>
        );
      })}
    </div>
  );
}