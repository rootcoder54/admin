import Link from "next/link";
import { User2 } from "lucide-react";

import { MAX_FREE_BOARDS } from "@/constants/boards";

import { FormPopover } from "@/components/form/form-popover";
import { Skeleton } from "@/components/ui/skeleton";
import { getBoards } from "@/lib/get-boards";
import TacheNavbar from "./Tache-navbar";

interface BoardListProps {
  orgId: string;
  availableCount: number;
  isPro: boolean;
}

export const BoardList = async () => {
  const boards = await getBoards();

  return (
    <div className="space-y-4">
      <TacheNavbar />
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 px-10">
        {boards.map((board) => (
          <Link
            key={board.id}
            href={`/tache/${board.id}`}
            className="group relative aspect-video h-full w-full overflow-hidden rounded-sm bg-sky-700 bg-cover bg-center bg-no-repeat p-2"
            style={{ backgroundImage: `url(${board.image})` }}
          >
            <div className="absolute inset-0 bg-black/30 transition group-hover:bg-black/40" />
            <p className="relative font-semibold text-white">{board.title}</p>
          </Link>
        ))}
        <div className="md:hidden">
          <FormPopover sideOffset={10}>
            <div
              role="button"
              className="relative flex aspect-video h-full w-full flex-col items-center justify-center gap-y-1 rounded-sm bg-muted transition hover:opacity-75"
            >
              <p className="text-sm">Créer une liste de tache</p>
              <span className="text-xs"></span>
            </div>
          </FormPopover>
        </div>
        <div className="hidden md:block">
          <FormPopover sideOffset={10} side="right">
            <div
              role="button"
              className="relative flex aspect-video h-full w-full flex-col items-center justify-center gap-y-1 rounded-sm bg-muted transition hover:opacity-75"
            >
              <p className="text-sm">Créer une liste de tache</p>
              <span className="text-xs"></span>
            </div>
          </FormPopover>
        </div>
      </div>
    </div>
  );
};

export const BoardListSkeleton = () => {
  return (
    <div className="gird-cols-2 grid gap-4 sm:grid-cols-3 lg:grid-cols-4">
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
    </div>
  );
};
