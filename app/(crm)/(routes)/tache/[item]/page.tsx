
import { ListContainer } from "@/components/tache/list-container";
import { getLists } from "@/lib/get-lists";


interface BoardIdPageProps {
  params: {
    boardId: string;
  };
}

const BoardIdPage = async ({ params }: BoardIdPageProps) => {

  const lists = await getLists(params.boardId);

  return (
    <div className="h-full overflow-x-auto p-4">
      <ListContainer boardId={params.boardId} data={lists} />
    </div>
  );
};

export default BoardIdPage;
