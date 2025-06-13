import { AddItemIntevention } from "@/components/intervention/addItemIntervention";
import { Button } from "@/components/ui/button";
import { ArrowBigLeft } from "lucide-react";
import Link from "next/link";

interface ClientIdPageProps {
  params: Promise<{ requeteId: string; interventionId: string }>;
}

const AddIntervention = async ({ params }: ClientIdPageProps) => {
  const { requeteId, interventionId } = await params;

  return (
    <div className="p-8 flex flex-col space-y-2">
      <div className="flex flex-row items-center space-x-4">
        <Link href={`/requete`}>
          <Button variant={"blue"}>
            <ArrowBigLeft />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">Ajouter une intervention</h1>
      </div>
      <AddItemIntevention clientId={requeteId}  interventionId={interventionId} />
    </div>
  );
};

export default AddIntervention;
