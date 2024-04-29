import { signIn } from "@/auth";
import { GoogleLogin } from "@react-oauth/google";

export function SignIn(className: any) {
  return (
    <form
      className={`${className} flex justify-center items-center`}
      action={async () => {
        "use server";
        await signIn("google", { redirectTo: "/home" });
      }}
    >
      <button
        type="submit"
        className="flex justify-center items-center p-2 rounded-full border text-sm font-medium hover:bg-gray-50"
      >
        Sign in with Google
      </button>
    </form>
  );
}
