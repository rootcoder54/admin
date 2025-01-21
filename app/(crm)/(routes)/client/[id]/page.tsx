import { getClientId } from "@/action/client/get-clientId";

interface ClientIdPageProps {
  params: Promise<{ id: string }>;
}

const ClientId = async ({ params }: ClientIdPageProps) => {
  const { id } = await params;
  const client = await getClientId(id)
  return <div>{client?.nomClient}</div>;
};

export default ClientId;
