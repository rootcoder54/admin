import { getBoard } from "@/lib/get-board";
import { getLists } from "@/lib/get-lists";

interface BoardIdPageProps {
  params: Promise<{ id: string }>;
}

const ImprimerIdPage = async ({ params }: BoardIdPageProps) => {
  const { id } = await params;
  const lists = await getLists(id);
  const board = await getBoard(id);

  return (
    <div id="pdf-content" className="h-full overflow-x-auto p-4">
      <h1>{board?.title}</h1>
      {lists.map((value, index) => (
        <ul key={index}>
          <h2>{value.title}</h2>
          {value.cards.map((card, index) => (
            <li key={index}>{card.title}</li>
          ))}
        </ul>
      ))}
    </div>
  );
};

export default ImprimerIdPage;
