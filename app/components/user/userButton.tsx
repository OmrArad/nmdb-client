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
  const userData = await setAuthTokenAndLogin(session?.accessToken);
  console.log("user button: ", userData);
  console.log("token: ", session?.accessToken);

  return (
    <>
      {user && userData ? (
        <UserDropdown
          onLogoutClick={handleLogout}
          _session={session}
          userData={userData}
        />
      ) : (
        <SignInButton handleLogin={handleLogin} />
      )}
    </>
  );
}
