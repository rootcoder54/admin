"use client";

import { Button } from "@/components/ui/button";
import { FileWarning } from "lucide-react";
import { useRouter } from "next/navigation";

const PageNotFound = () => {
  const router = useRouter();
  return (
    <div className="min-h-screen flex flex-col justify-center items-center space-y-2">
      <FileWarning className="size-14" />
      <h1 className="text-4xl font-bold">Erreur 404</h1>
      <p className="text-lg">Page non trouvée</p>
      <p className="text-gray-500">
        La page que vous recherchez n&apos;existe pas.
      </p>
      <Button onClick={() => router.back()} variant={"blue"}>
        Retourner à la page précédente
      </Button>
    </div>
  );
};

export default PageNotFound;
