"use client";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

const page = () => {
  const { setTheme } = useTheme();
  useEffect(() => {
    setTheme("light");
  }, []);
  return (
    <div className="min-h-screen flex flex-col justify-between items-center py-5">
      <div className="flex justify-between items-center w-full md:w-3/4 lg:w-3/5 px-3 border-b-2 py-1">
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
        <div>
          <Link href="/formation">Formation</Link>
        </div>
      </div>
    </div>
  );
};

export default page;
