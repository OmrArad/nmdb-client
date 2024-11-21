"use client";
import React from "react";
import Link from "next/link";

const UserDashboard = () => {
  const navItems = [
    // { name: "Overview", path: "/user/overview" },
    // { name: "Discussions", path: "/user/discussions" },
    // { name: "Lists", path: "/user/lists" },
    { name: "Watchlist", path: "/user/watchlist" },
    { name: "Ratings", path: "/user/ratings" },
    { name: "Recommendations", path: "/user/recommendations" },
  ];

  return (
    <div className="bg-white shadow-md">
      <div className="max-w-2xl mx-auto px-4">
        <div className="flex justify-between items-center border-b-2 border-gray-100 py-1">
          {navItems.map((item, index) => (
            <Link
              key={index}
              href={item.path}
              className="text-gray-600 hover:text-blue-500 px-3 py-2 rounded-md text-sm font-medium"
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
