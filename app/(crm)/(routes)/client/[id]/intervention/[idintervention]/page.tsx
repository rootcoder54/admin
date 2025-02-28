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
import { Edit2, File, PlusCircle, Trash2 } from "lucide-react";

import Link from "next/link";
import { DeteleIntervention } from "@/components/intervention/deleteIntervention";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";

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
            {intervention?.document ? (
              <Link
                href={`/imprime/intervention/${intervention.document.id}`}
                target="_blank"
              >
                <Button variant={"outline"}>
                  <File />
                  Fiche
                </Button>
              </Link>
            ) : (
              <Link
                href={`/client/${intervention?.clientId}/intervention/${intervention?.id}/file`}
              >
                <Button variant={"outline"}>
                  <PlusCircle />
                  Fiche
                </Button>
              </Link>
            )}
            <Button variant={"secondary"}>
              <Edit2 />
              Editer
            </Button>
            <DeteleIntervention interventionId={intervention?.id} />
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
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Debut</TableHead>
              <TableHead>Fin</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>
                <Link
                  href={`/client/${intervention?.clientId}/intervention/add/${intervention?.id}`}
                >
                  <Button variant={"secondary"} size={"icon"}>
                    <PlusCircle />
                  </Button>
                </Link>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {intervention?.items.map((item) => (
              <TableRow key={item.id}>
                <TableCell className="font-medium">
                  {`${
                    String(item.date.getDate()).length === 1
                      ? "0" + String(item.date.getDate())
                      : String(item.date.getDate())
                  } / ${
                    String(item.date.getMonth()).length === 1
                      ? "0" + String(item.date.getMonth() + 1)
                      : String(item.date.getMonth() + 1)
                  } /  ${String(item.date.getFullYear())} `}
                </TableCell>
                <TableCell>{item.debut}</TableCell>
                <TableCell>{item.fin}</TableCell>
                <TableCell>{item.description}</TableCell>
                <TableCell>
                  <Link
                    href={`/client/${intervention?.clientId}/intervention/${intervention?.id}/delete/${item.id}`}
                  >
                    <Button variant={"danger"} size={"icon"}>
                      <Trash2 />
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
            
          </TableBody>
        </Table>
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
