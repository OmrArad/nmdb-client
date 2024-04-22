import Link from "next/link";
import styles from "@/app/styles/Toolbar.module.css";
import NmdbLogo from "../nmdb-logo";
import { Lusitana } from "next/font/google";
import SideNav from "../dashboard/sidenav";
import TopNav from "../dashboard/topnav";

const lusitana = Lusitana({
  weight: ["400", "700"],
  subsets: ["latin"],
});

interface Links {
  name: string;
  href: string;
  style: string;
}

const links = [
  { name: "Sign In", href: "/singIn", style: "signIn" },
  {
    name: "Sign Up",
    href: "/singUp",
    style: "signUp",
  },
  {
    name: "Continue as a guest",
    href: "/dashboard",
    style: "guest",
  },
];

// export default function Toolbar({ links }: { links: Links[] }) {
export default function Toolbar({ landing = false }: { landing: boolean }) {
  return (
    <div
      className={`${lusitana.className} ${
        landing ? styles.landing : styles.toolbar
      }`}
    >
      <Link href="/landing" className={styles.title}>
        NMDB
      </Link>
      {!landing ? <TopNav /> : <></>}
      <div className={styles.buttons}>
        {links.map((link) => {
          const linkName = link.name;
          return landing || link !== links[2] ? (
            <Link
              key={linkName}
              href={link.href}
              className={`${styles.button} ${styles[link.style]}`}
            >
              {linkName}
            </Link>
          ) : (
            <></>
          );
        })}
      </div>
    </div>
  );
}
