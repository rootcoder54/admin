import { getInterventionId } from "@/action/intervention/get-intervention";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Edit2, Trash2 } from "lucide-react";
import Link from "next/link";

interface IdPageProps {
  params: Promise<{ idintervention: string }>;
}

const PageIntervention = async ({ params }: IdPageProps) => {
  const { idintervention } = await params;
  const intervention = await getInterventionId(idintervention);
  return (
    <div>
      <header className="flex h-14 shrink-0 items-center gap-2">
        <div className="flex flex-1 items-center gap-2 px-3">
          <SidebarTrigger />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbPage className="line-clamp-1">
                  <Link href={"/client"}>Liste des clients</Link>
                </BreadcrumbPage>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="line-clamp-1">
                  <Link href={`/client/${intervention?.clientId}`}>
                    {intervention?.client.nomClient}
                  </Link>
                </BreadcrumbPage>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="line-clamp-1">
                  Intervention
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="ml-auto px-3"></div>
      </header>
      <div className="mx-auto w-full max-w-[1280px] p-8 flex flex-col space-y-2">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-xl font-semibold">Intervention</h2>
          <div className="flex gap-x-3">
            <Button variant={"secondary"}>
              <Edit2 />
              Editer
            </Button>
            <Button
              variant={"outline"}
              className="text-red-600 hover:text-red-600"
            >
              <Trash2 />
              Supprimer
            </Button>
          </div>
        </div>
        <hr />
        <div className="border rounded-md grid grid-cols-4 space-y-3 gap-x-2 p-5">
          <div className="flex gap-x-2">
            <span className="text-sm text-neutral-600 dark:text-neutral-400">
              Numero :
            </span>
            <span className="text-sm">{affiche(intervention?.numero)}</span>
          </div>
          <div className="flex gap-x-2">
            <span className="text-sm text-neutral-600 dark:text-neutral-400">
              Service :
            </span>
            <span className="text-sm">{affiche(intervention?.service)}</span>
          </div>
          <div className="flex gap-x-2">
            <span className="text-sm text-neutral-600 dark:text-neutral-400">
              Intervenant :
            </span>
            <span className="text-sm">
              {affiche(intervention?.intervenant)}
            </span>
          </div>
          <div className="flex gap-x-2">
            <span className="text-sm text-neutral-600 dark:text-neutral-400">
              Nature :
            </span>
            <span className="text-sm">{affiche(intervention?.nature)}</span>
          </div>
          <div className="flex gap-x-2">
            <span className="text-sm text-neutral-600 dark:text-neutral-400">
              Observation :
            </span>
            <span className="text-sm">
              {affiche(intervention?.observations)}
            </span>
          </div>
          <div className="flex gap-x-2">
            <span className="text-sm text-neutral-600 dark:text-neutral-400">
              Date Cloture :
            </span>
            <span className="text-sm">
              {String(intervention?.createdAt.getDate())}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageIntervention;

const affiche = (text: string | undefined | null) => {
  if (!text) {
    return "vide";
  }
  return text;
};
