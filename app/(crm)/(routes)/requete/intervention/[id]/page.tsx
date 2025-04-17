import { InterventionRequete } from "@/components/requete/intervention-requete";

interface PageProps {
  params: Promise<{ id: string }>;
}

const RequeteIntervention = async ({ params }: PageProps) => {
  const { id } = await params;
  return <InterventionRequete id={id} />;
};

export default RequeteIntervention;
