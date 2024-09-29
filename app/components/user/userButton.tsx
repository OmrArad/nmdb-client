import { signIn, signOut } from "@/auth";
import UserDropdown from "./userDropdown";
import { SessionProvider } from "next-auth/react";

export default async function UserButton() {
  const handleLogout = async () => {
    "use server";
    await signOut();
  };

  const handleLogin = async () => {
    "use server";
    await signIn("google");
  };

  return (
    <SessionProvider>
      <UserDropdown onLogoutClick={handleLogout} handleLogin={handleLogin} />
    </SessionProvider>
  );
}
