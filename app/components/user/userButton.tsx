import { auth, signIn, signOut } from "@/auth";
import SignInButton from "../login/signInButton";
import UserDropdown from "./userDropdown";

export default async function UserButton() {
  const session = await auth();
  const user = session?.user;

  const handleLogout = async () => {
    "use server";
    await signOut();
  };

  const handleLogin = async () => {
    "use server";
    await signIn("google");
  };

  return (
    <>
      {user ? (
        <UserDropdown onLogoutClick={handleLogout} session={session} />
      ) : (
        <SignInButton handleLogin={handleLogin} />
      )}
    </>
  );
}
