import { ListBoard } from "@/components/tache/list-board";

const Page = async ({
  params
}: {
  params: Promise<{ item: string; listId: string }>;
}) => {
  const { item, listId } = await params;
  return (
    <div>
      <ListBoard item={item} listId={listId} />
    </div>
  );
};

export default Page;
