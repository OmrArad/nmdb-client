import Link from "next/link";
import styles from "@/app/styles/Toolbar.module.css";

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
export default function Toolbar() {
  return (
    <div className={styles.toolbar}>
      <h1 className={styles.title}>NMDB</h1>
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
  );
}
