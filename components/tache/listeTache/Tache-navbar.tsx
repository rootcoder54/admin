import { SidebarTrigger } from "@/components/ui/sidebar";
import { User2 } from "lucide-react";

const TacheNavbar = () => {
  return (
    <div className="top-0 z-[40] flex h-14 w-full items-center gap-x-4 bg-black/50 px-6 text-lg font-semibold text-neutral-900 dark:text-zinc-100 py-5">
      <SidebarTrigger />
      <div className="flex">
        <User2 className="mr-2 h-6 w-6" />
        Vos Taches
      </div>
    </div>
  );
};

export default TacheNavbar;
