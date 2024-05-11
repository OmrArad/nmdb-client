import Image from "next/image";
import { Session } from "next-auth";
import { UserCircleIcon } from "@heroicons/react/24/outline";

export default function UserImage({ session }: { session: Session }) {
  if (!session?.user?.image) return <UserCircleIcon className="w-6" />;

  return (
    <Image
      src={session.user.image}
      alt="User Avatar"
      width={96}
      height={96}
      className="rounded-full min-w-10"
    />
  );
}
