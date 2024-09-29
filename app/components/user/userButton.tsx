import { auth, signIn, signOut } from "@/auth";
import SignInButton from "../login/signInButton";
import UserDropdown from "./userDropdown";
import { setAuthTokenAndLogin } from "@/app/api/auth/auth";
import { getWatchlist } from "@/app/api/watchlist/watchlistServices";

export default async function UserButton() {
  const session = await auth();
  const user = session?.user;
  const res = await setAuthTokenAndLogin(session?.accessToken);
  // console.log(res);
  // const watchlist = await getWatchlist();

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
      {user && res ? (
        <UserDropdown
          onLogoutClick={handleLogout}
          session={session}
          // userWatchlist={watchlist}
        />
      ) : (
        <SignInButton handleLogin={handleLogin} />
      )}
    </>
  );
}
