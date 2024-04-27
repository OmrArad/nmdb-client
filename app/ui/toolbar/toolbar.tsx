import Link from "next/link";
import styles from "@/app/styles/Toolbar.module.css";
import TopNav from "../dashboard/topnav";

interface Links {
  name: string;
  href: string;
  style: string;
}

const links = [
  {
    name: "Continue as a guest",
    href: "/home",
    style: "guest",
  },
];

// export default function Toolbar({ links }: { links: Links[] }) {
export default function Toolbar({ shouldHideNav = false }) {
  return (
    <>
      {shouldHideNav ? (
        <div className={styles.landing}>
          <Link href="/landing" className={styles.title}>
            NMDB
          </Link>
          <div className={styles.buttons}>
            {links.map((link) => {
              const linkName = link.name;
              return (
                <Link
                  key={linkName}
                  href={link.href}
                  className={`${styles.button} ${styles[link.style]}`}
                >
                  {linkName}
                </Link>
              );
            })}
          </div>
        </div>
      ) : (
        <div className={styles.toolbar}>
          <Link href="/landing" className={styles.title}>
            NMDB
          </Link>
          <TopNav />
        </div>
      )}
    </>
  );
}
