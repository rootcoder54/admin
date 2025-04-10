interface PageProps {
  params: Promise<{ id: string }>;
}

const RequeteId = async ({ params }: PageProps) => {
  const { id } = await params;
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold">RequeteId {id}</h1>
      <p className="mt-4 text-gray-600 dark:text-neutral-400">
        This is the RequeteId page.
      </p>
    </div>
  );
};

export default RequeteId;
