import Loading from "@/app/(crm)/loading";
import { ListContainer } from "@/components/tache/list-container";
import { getLists } from "@/lib/get-lists";
import { Suspense } from "react";

interface BoardIdPageProps {
  params: Promise<{ item: string }>;
}

const BoardIdPage = async ({ params }: BoardIdPageProps) => {
  const { item } = await params;
  const lists = await getLists(item);

  return (
    <Suspense fallback={<Loading />}>
      <div className="h-full overflow-x-auto p-4">
        <ListContainer boardId={item} data={lists} />
      </div>
    </Suspense>
  );
};

export default BoardIdPage;
