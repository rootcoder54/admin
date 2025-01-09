import { upperCase } from "lodash";
import { notFound, redirect } from "next/navigation";

import { BoardNavbar } from "@/components/tache/board-navbar";
import { getBoard } from "@/lib/get-board";
import { Suspense } from "react";

export async function generateMetadata({
  params
}: {
  params: Promise<{ item: string }>;
}) {
  const { item } = await params;
  const board = await getBoard(item);

  return {
    title: upperCase(board?.title || "Board")
  };
}

const BoardIdLayout = async ({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ item: string }>;
}) => {
  const { item } = await params;
  console.log(item);

  const board = await getBoard(item);

  if (!board) {
    notFound();
  }

  return (
    <div
      className="relative h-full bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${board.image})` }}
    >
      <BoardNavbar data={board} />
      <div className="absolute inset-0 bg-black/10" />
      <main className="relative h-full pt-28">{children}</main>
    </div>
  );
};

export default BoardIdLayout;
