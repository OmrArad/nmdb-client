import React from "react";
import Link from "next/link";

const AvatarDropdown = ({ onLogoutClick = () => {} }) => {
  return (
    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md overflow-hidden shadow-xl z-10">
      <Link
        href="/profile"
        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
      >
        View profile
      </Link>
      <Link
        href="/user/watchlist"
        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
      >
        Watchlist
      </Link>
      {/* Add other dropdown items */}
      <form
        action={onLogoutClick}
        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
      >
        <button>Logout</button>
      </form>
    </div>
  );
};

export default AvatarDropdown;
