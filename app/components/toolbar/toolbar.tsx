import Link from "next/link";
import styles from "@/app/styles/Toolbar.module.css";
import TopNav from "../dashboard/topnav";

export default function Toolbar() {
  return (
    <div className={styles.toolbar}>
      <Link href="/" className={styles.title}>
        NMDB
      </Link>
      <TopNav />
    </div>
  );
}
