import Image from "next/image";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import { useSession } from "next-auth/react";

export default function UserImage({
  image,
}: {
  image: string | null | undefined;
}) {
  const { data: session } = useSession();
  // const image = session?.user?.image;
  if (!image) return <UserCircleIcon className="w-6" />;

  return (
    <Image
      src={image}
      alt="User Avatar"
      width={96}
      height={96}
      className="rounded-full min-w-10"
    />
  );
}
