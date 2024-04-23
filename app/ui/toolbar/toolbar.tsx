import Link from "next/link";
import styles from "@/app/styles/Toolbar.module.css";
import TopNav from "../dashboard/topnav";

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
    href: "/home",
    style: "guest",
  },
];

// export default function Toolbar({ links }: { links: Links[] }) {
export default function Toolbar({ shouldHideNav = false }) {
  return (
    <div className={`${shouldHideNav ? styles.landing : styles.toolbar}`}>
      <Link href="/landing" className={styles.title}>
        NMDB
      </Link>
      {!shouldHideNav ? <TopNav /> : <></>}
      <div className={styles.buttons}>
        {links.map((link) => {
          const linkName = link.name;
          return shouldHideNav || link !== links[2] ? (
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
