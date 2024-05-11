import Link from "next/link";

// Map of links to display in the side navigation.
// Depending on the size of the application, this would be stored in a database.
const links = [
  {
    name: "Profile",
    href: "/profile",
  },
  {
    name: "Watchlist",
    href: "/user/watchlist",
  },
];

const style =
  "block px-4 py-2 text-sm text-gray-700 hover:bg-emerald-100 w-full text-left";

const AvatarDropdown = ({ onLogoutClick = () => {} }) => {
  return (
    <div className="absolute right-6 mt-2 w-48 bg-gray-50 rounded-md overflow-hidden shadow-xl z-10 divide-y">
      <div>
        {links.map((link) => {
          return (
            <Link key={link.name} href={link.href} className={style}>
              {link.name}
            </Link>
          );
        })}
      </div>
      <form action={onLogoutClick}>
        <button className={style}>Logout</button>
      </form>
    </div>
  );
};

export default AvatarDropdown;
