
import { ListContainer } from "@/components/tache/list-container";
import { getLists } from "@/lib/get-lists";


interface BoardIdPageProps {
  params: {
    item: string;
  };
}

const BoardIdPage = async ({ params }: BoardIdPageProps) => {

  const lists = await getLists(params.item);

  return (
    <div className="h-full overflow-x-auto p-4">
      <ListContainer boardId={params.item} data={lists} />
    </div>
  );
};

export default BoardIdPage;
