import { AddItemIntevention } from "@/components/intervention/addItemIntervention";

interface ClientIdPageProps {
  params: Promise<{ interventionId: string }>;
}

const AddIntervention = async ({ params }: ClientIdPageProps) => {
  const { interventionId } = await params;

  return (
    <div>
      <AddItemIntevention interventionId={interventionId} />
    </div>
  );
};

export default AddIntervention;
