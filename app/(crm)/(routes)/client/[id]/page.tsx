import { ClientComponent } from "../_component/client";

interface ClientIdPageProps {
  params: Promise<{ id: string }>;
}

const ClientId = async ({ params }: ClientIdPageProps) => {
  const { id } = await params;
  return (
    <div>
      <ClientComponent clientId={id} />
    </div>
  );
};

export default ClientId;
