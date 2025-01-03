import { buttonVariants } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const pathname = usePathname();
  return (
    <div className="flex justify-between items-center w-full md:w-3/4 lg:w-3/5 px-3 border-b-2 py-1">
      <div className="flex items-center gap-x-3">
        <Link
          href="https://malisystem.com/"
          className="flex items-center gap-1"
        >
          <Image
            src={"/msys.png"}
            alt="logo"
            width={54}
            height={45}
            className="dark:invert"
          />
          <div>
            <span className="font-bold text-2xl">MALI</span>
            <span className="font-bold text-yellow-500 text-2xl">SYSTEM</span>
          </div>
        </Link>
      </div>

      <div className="flex items-center gap-x-4">
        {!pathname.startsWith("/formation") && (
          <Link
            href="/formation"
            className={buttonVariants({ variant: "ghost" })}
          >
            Formation
          </Link>
        )}
        {pathname !== "/support" && (
          <Link
            href="/support"
            className={buttonVariants({ variant: "ghost" })}
          >
            Support
          </Link>
        )}
        <div className="border border-zinc-400 h-7" />
        <Link href="/" className={buttonVariants({ variant: "outline" })}>
          Admin
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
