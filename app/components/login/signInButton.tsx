import { UserCircleIcon } from "@heroicons/react/24/outline";
import styles from "@/app/styles/NavButton.module.css";
import clsx from "clsx";
import GoogleSignInButton from "./googleSignInButton";

export default function SignInButton({
  handleLogin,
}: {
  handleLogin?: () => void;
}) {
  return (
    <form action={handleLogin}>
      <button type="submit" className={clsx(styles.base_button, styles.guest)}>
        <UserCircleIcon className="block lg:hidden w-6" />
        <GoogleSignInButton />
      </button>
    </form>
  );
}
