import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="flex justify-between items-center w-full md:w-3/4 lg:w-3/5 px-3 border-b-2 py-1">
      <div className="flex items-center gap-x-3">
        <Link
          href="https://malisystem.com/"
          className="flex items-center gap-1"
        >
          <Image src={"/msys.png"} alt="logo" width={54} height={45} />
          <div>
            <span className="font-bold text-2xl">MALI</span>
            <span className="font-bold text-yellow-500 text-2xl">SYSTEM</span>
          </div>
        </Link>
        <div className="border border-yellow-500 h-7" />
        <Link
          href={"/support"}
          className="text-2xl text-yellow-500 font-semibold"
        >
          Support
        </Link>
      </div>

      <div className="flex items-center gap-x-4">
        <Link href="/formation">Formation</Link>
        <div className="border border-zinc-400 h-7" />
        <Link href="/">Admin</Link>
      </div>
    </div>
  );
};

export default Navbar;
