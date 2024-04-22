import { SparklesIcon } from "@heroicons/react/24/outline";
import { Lusitana } from "next/font/google";

const lusitana = Lusitana({
  weight: ["400", "700"],
  subsets: ["latin"],
});

export default function NmdbLogo() {
  return (
    <div
      className={`${lusitana.className} flex flex-row items-center leading-none text-white`}
    >
      <SparklesIcon className="h-20 w-20 rotate-[15deg]" />
      <p className="text-[44px]">NMDB</p>
    </div>
  );
}
