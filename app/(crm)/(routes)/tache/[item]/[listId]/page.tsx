import { ListBoard } from "@/components/tache/list-board";

const Page = ({ params }: { params: { item: string; listId: string } }) => {
  return (
    <div>
      <ListBoard item={params.item} listId={params.listId} />
    </div>
  );
};

export default Page;
