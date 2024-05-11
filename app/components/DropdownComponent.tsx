import Link from "next/link";
import { Dropdown } from "flowbite-react";

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

const DropdownComponent = ({
  onLogoutClick,
  dropdownTheme,
}: {
  onLogoutClick: () => void;
  dropdownTheme: () => React.JSX.Element;
}) => {
  return (
    <Dropdown
      label="Dropdown button"
      dismissOnClick={false}
      renderTrigger={dropdownTheme}
    >
      <div className="w-36 divide-y">
        <div>
          {links.map((link) => {
            return (
              <Dropdown.Item key={link.name} className={style}>
                <Link href={link.href}>{link.name}</Link>
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

export default DropdownComponent;
