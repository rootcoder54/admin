import Licence from "../_component/licence";

interface PageProps {
  params: Promise<{ idClient: string }>;
}
const LicencePrintPage = async ({ params }: PageProps) => {
  const { idClient } = await params;
  
  return (
    <div id="pdf-content" className="h-full p-10 space-y-3">
      <Licence idClient={idClient} />
    </div>
  );
};

export default LicencePrintPage;
