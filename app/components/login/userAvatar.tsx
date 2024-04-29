import Image from "next/image";
import { Session } from "next-auth";

export default function UserAvatar({ session }: { session: Session | null }) {
  if (!session?.user) return null;

  return (
    <div>
      <Image
        src={session.user.image}
        alt="User Avatar"
        width={96}
        height={96}
        className="rounded-md min-w-10"
      />
    </div>
  );
}
