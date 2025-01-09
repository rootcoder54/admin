import { clients } from "@/data/type/client";

interface ClientIdPageProps {
  params: Promise<{ id: string }>;
}

const ClientId = async ({ params }: ClientIdPageProps) => {
  const { id } = await params;
  const client = clients.find((item) => item.numero === id);
  return <div>{client?.nomClient}</div>;
};

export default ClientId;
