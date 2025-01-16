import { getBoard } from "@/lib/get-board";
import { getListId } from "@/lib/get-lists";
import PrintButton from "../../../_component/print";
import { CalendarDays, Check } from "lucide-react";

interface BoardIdPageProps {
  params: Promise<{ boardId: string; id: string }>;
}

const ImprimerIdPage = async ({ params }: BoardIdPageProps) => {
  const {boardId, id } = await params;

  const list = await getListId(id);
  const board = await getBoard(boardId);

  return (
    <div id="pdf-content" className="h-full p-10 space-y-3">
      <PrintButton />
      <div className="flex flex-col mx-auto space-y-4">
        <div className="flex items-center gap-2">
          <CalendarDays className="h-12" />
          <h1 className="text-3xl font-bold">{board?.title}</h1>
        </div>
        <div className="flex flex-col gap-y-5">
          <h3 className="text-xl font-semibold">{list?.title}</h3>
          <hr />
          <ul className="space-y-4">
            {list?.cards.map((card: any, index: number) => (
              <li key={index} className="flex flex-row gap-x-4">
                <Check />
                <span className="text-lg text-zinc-700">{card.title}</span>
              </li>
            ))}
            {list?.cards.length === 0 && (
              <span className="text-lg text-zinc-700">Vide</span>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ImprimerIdPage;
