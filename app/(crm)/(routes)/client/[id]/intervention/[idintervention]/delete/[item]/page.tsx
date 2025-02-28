import { DeleteItem } from "@/components/intervention/item/delete-item";

interface IdPageProps {
  params: Promise<{ item: string; id: string }>;
}
const DeleteItemPage = async ({ params }: IdPageProps) => {
  const { item, id } = await params;
  return (
    <div className="h-full w-full">
      <DeleteItem id={item} idClient={id} />
    </div>
  );
};

export default DeleteItemPage;
