import { AddIntevention } from "@/components/intervention/addIntervention";
import { Button } from "@/components/ui/button";
import { ArrowBigLeft } from "lucide-react";
import Link from "next/link";

interface ClientIdPageProps {
  params: Promise<{ id: string; requeteId?: string }>;
}

const AddIntervention = async ({ params }: ClientIdPageProps) => {
  const { id, requeteId } = await params;

  return (
    <div className="p-8 flex flex-col space-y-2">
      <div className="flex flex-row items-center space-x-4">
        <Link href={`/requete/intervention/${requeteId}`}>
          <Button variant={"blue"}>
            <ArrowBigLeft />
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">Ajouter une intervention</h1>
      </div>
      <AddIntevention id={id} requeteId={requeteId} />
    </div>
  );
};

export default AddIntervention;
