interface IntervIdPageProps {
  params: Promise<{ id: string }>;
}

const ImprimerIntervention = async ({ params }: IntervIdPageProps) => {
  const { id } = await params;
  return (
    <div className="min-h-screen">
      <iframe
        src={`/api/upload/pdf/${id}`}
        width="100%"
        height="100%"
        className="min-h-screen"
        style={{ border: "none" }}
        title="PDF Viewer"
      />
    </div>
  );
};

export default ImprimerIntervention;
