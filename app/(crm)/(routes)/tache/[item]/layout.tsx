import { upperCase } from "lodash";
import { notFound, redirect } from "next/navigation";

import { BoardNavbar } from "@/components/tache/board-navbar";
import { getBoard } from "@/lib/get-board";


export async function generateMetadata({
  params,
}: {
  params: { item: string };
}) {


  const board = await getBoard(params.item);

  return {
    title: upperCase(board?.title || "Board"),
  };
}

const BoardIdLayout = async ({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { item: string };
}) => {

  console.log(params.item)

  const board = await getBoard(params.item);

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
