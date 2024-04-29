import { UserCircleIcon } from "@heroicons/react/24/outline";

export default function GuestAvatar({
  handleLogin,
}: {
  handleLogin?: () => void;
}) {
  return (
    <form action={handleLogin}>
      <button
        type="submit"
        className="flex h-[48px] w-max grow items-center justify-center gap-2 rounded-md bg-gray-50/75 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue-600 md:flex-none md:justify-start md:p-2 md:px-3"
      >
        <UserCircleIcon className="block lg:hidden w-6" />
        <div className="hidden lg:block">Sign Up / Login</div>
      </button>
    </form>
  );
}
