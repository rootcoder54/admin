import { Board } from "@prisma/client";

import { BoardTitleForm } from "./board-title-form";
import { BoardOptions } from "./board-options";
import { SidebarTrigger } from "@/components/ui/sidebar";

interface BoardNavbarProps {
  data: Board;
}

export const BoardNavbar = async ({ data }: BoardNavbarProps) => {
  return (
    <div className="fixed top-0 z-[40] flex h-14 w-full items-center gap-x-4 bg-black/50 px-6 text-white">
      <SidebarTrigger />
      <BoardTitleForm data={data} />
      <div className="">
        <BoardOptions id={data.id} />
      </div>
    </div>
  );
};
