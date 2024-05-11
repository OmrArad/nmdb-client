import { auth, signIn, signOut } from "@/auth";
import UserAvatar from "./userAvatar";
import GuestAvatar from "./guestAvatar";

export default async function LoginLink() {
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
        <UserAvatar handleLogout={handleLogout} session={session} />
      ) : (
        <GuestAvatar handleLogin={handleLogin} />
      )}
    </>
  );
}
