import { AddItemIntevention } from "@/components/intervention/addItemIntervention";

interface ClientIdPageProps {
  params: Promise<{ id: string; interventionId: string }>;
}

const AddIntervention = async ({ params }: ClientIdPageProps) => {
  const { id, interventionId } = await params;

  return (
    <div>
      <AddItemIntevention clientId={id} interventionId={interventionId} />
    </div>
  );
};

export default AddIntervention;
