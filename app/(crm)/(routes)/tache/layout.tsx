import { upperCase } from "lodash";
import { notFound, redirect } from "next/navigation";

import { BoardNavbar } from "@/components/tache/board-navbar";
import { getBoard } from "@/lib/get-board";


export async function generateMetadata({
  params,
}: {
  params: { boardId: string };
}) {


  const board = await getBoard(params.boardId);

  return {
    title: upperCase(board?.title || "Board"),
  };
}

const BoardIdLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { boardId: string };
}) => {



  const board = await getBoard(params.boardId);

  if (!board) {
    notFound();
  }

  return (
    <div
      className="relative h-full bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${board.imageFullUrl})` }}
    >
      <BoardNavbar data={board} />
      <div className="absolute inset-0 bg-black/10" />
      <main className="relative h-full pt-28">{children}</main>
    </div>
  );
};

export default BoardIdLayout;
