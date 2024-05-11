import Toolbar from "../components/toolbar/toolbar";
import styles from "@/app/styles/Home.module.css";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className={`${styles.container} h-full md:h-screen`}>{children}</div>
    </>
  );
}
