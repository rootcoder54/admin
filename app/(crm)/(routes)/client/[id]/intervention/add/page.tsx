import { AddIntevention } from "@/components/intervention/addIntervention";

interface ClientIdPageProps {
  params: Promise<{ id: string }>;
}

const AddIntervention = async ({ params }: ClientIdPageProps) => {
  const { id } = await params;

  return (
    <div>
      <AddIntevention id={id} requeteId={undefined} client="MaliSystem" />
    </div>
  );
};

export default AddIntervention;
