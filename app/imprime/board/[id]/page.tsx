import { getBoard } from "@/lib/get-board";
import { getLists } from "@/lib/get-lists";
import PrintButton from "../../_component/print";
import { CalendarDays, Check } from "lucide-react";

interface BoardIdPageProps {
  params: Promise<{ id: string }>;
}

const ImprimerIdPage = async ({ params }: BoardIdPageProps) => {
  const { id } = await params;

  // ✅ Récupération des données côté serveur
  const lists = await getLists(id);
  const board = await getBoard(id);

  return (
    <div id="pdf-content" className="h-full p-10 space-y-3">
      <PrintButton />
      <div className="flex flex-col mx-auto space-y-4">
        <div className="flex items-center gap-2">
          <CalendarDays className="h-12" />
          <h1 className="text-3xl font-bold">{board?.title}</h1>
        </div>
        {lists.map((value, index) => (
          <div key={index} className="flex flex-col gap-y-5">
            <h3 className="text-xl font-semibold">{value.title}</h3>
            <hr />
            <ul key={index} className="space-y-4">
              {value.cards.map((card, index: number) => (
                <li key={index} className="flex flex-row gap-x-4">
                  <Check />
                  <span className="text-lg text-zinc-700">{card.title}</span>
                </li>
              ))}
              {value.cards.length === 0 && (
                <span className="text-lg text-zinc-700">Vide</span>
              )}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImprimerIdPage;
