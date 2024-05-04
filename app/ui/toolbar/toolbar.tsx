import Link from "next/link";
import styles from "@/app/styles/Toolbar.module.css";
import TopNav from "../dashboard/topnav";
import { SignIn } from "@/app/components/login/signIn";
interface Links {
  name: string;
  href: string;
  style: string;
}

const links = [
  {
    name: "Continue as a guest",
    href: "/",
    style: "guest",
  },
];

// export default function Toolbar({ links }: { links: Links[] }) {
export default function Toolbar({ shouldHideNav = false }) {
  return (
    <>
      {shouldHideNav ? (
        <div className={styles.landing}>
          <Link href="/" className={styles.title}>
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
            <SignIn className={`${styles.button} ${styles.signIn}`} />
          </div>
        </div>
      ) : (
        <div className={styles.toolbar}>
          <Link href="/" className={styles.title}>
            NMDB
          </Link>
          <TopNav />
        </div>
      )}
    </>
  );
}
