interface ClientIdPageProps {
  params: {
    id: string;
  };
}

const ClientId = ({ params }: ClientIdPageProps) => {
  return <div>{params.id}</div>;
};

export default ClientId;
