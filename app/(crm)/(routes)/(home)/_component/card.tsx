"use client";
import { Skeleton } from "@/components/ui/skeleton";
import { fetcher } from "@/lib/fetcher";
import { Boards } from "@/types";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

export const ItemNotice = () => {
  const {
    data: boards,
  } = useQuery<Boards[]>({
    queryKey: ["boards"],
    queryFn: () => fetcher(`/api/tache`)
  });

  if (!boards) {
    return (
      <div className="flex flex-col w-full items-start gap-4 ">
        <h3 className="text-2xl">Ma Liste de Tache</h3>
        <BoardListSkeleton />
      </div>
    );
  }
  return (
    <div className="flex flex-col w-full items-start gap-4">
      <h3 className="text-2xl">Ma Liste de Tache</h3>
      <div className="grid grid-cols-2 gap-4 w-full px-10">
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
      </div>
    </div>
  );
};

const BoardListSkeleton = () => {
  return (
    <div className="grid grid-cols-2 gap-4 w-full px-10">
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
      <Skeleton className="aspect-video h-full w-full p-2" />
    </div>
  );
};
