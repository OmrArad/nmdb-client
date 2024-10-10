import { auth, signIn, signOut } from "@/auth";
import SignInButton from "../login/signInButton";
import UserDropdown from "./userDropdown";
import { setAuthTokenAndLogin } from "@/app/api/auth/auth";

export const handleLogout = async () => {
  "use server";
  await signOut();
};

export const handleLogin = async () => {
  "use server";
  await signIn("google");
};

export default async function UserButton() {
  const session = await auth();
  const user = session?.user;
  const res = await setAuthTokenAndLogin(session?.accessToken);
  console.log(session?.accessToken);

  return (
    <>
      {user && res ? (
        <UserDropdown onLogoutClick={handleLogout} _session={session} />
      ) : (
        <SignInButton handleLogin={handleLogin} />
      )}
    </>
  );
}
