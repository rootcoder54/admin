import { DetailRequet } from "@/components/requete/detail";

interface PageProps {
  params: Promise<{ id: string }>;
}

const RequeteId = async ({ params }: PageProps) => {
  const { id } = await params;
  return (
    <DetailRequet id={id} />
  );
};

export default RequeteId;
