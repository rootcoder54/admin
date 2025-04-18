import { Button } from "@/components/ui/button";
import { Edit2, PlusCircle, Trash2 } from "lucide-react";

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
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";

import Image from "next/image";
import { ObservationForm } from "@/components/intervention/observation-form";
import { format } from "date-fns";
import { InterventionAll } from "@/types";

export const DetailIntervention = ({
  intervention
}: {
  intervention: InterventionAll;
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full">
          {intervention.intervenant}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[1280px]">
        <DialogTitle />
        <div className="mx-auto w-full max-w-[1280px] p-8 flex flex-col space-y-2">
          <div className="flex flex-row justify-between items-center">
            <h2 className="text-xl font-semibold">Intervention</h2>
            <div className="flex gap-x-3">
              <Link
                href={`/client/${intervention?.clientId}/intervention/${intervention?.id}/file`}
              >
                <Button variant={"outline"}>
                  <PlusCircle />
                  Fiche
                </Button>
              </Link>
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
            <div className="flex gap-x-2 font-extrabold">
              <span className="text-sm text-neutral-600 dark:text-neutral-400">
                Date Cloture :
              </span>
              <span className="text-sm">
                {intervention?.dateCloture &&
                  format(intervention?.dateCloture, "yyyy-MM-dd")}
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
                    {format(item.date, "yyyy-MM-dd")}
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
          {intervention?.documentId ? (
            <Link
              href={`/imprime/intervention/${intervention.documentId}`}
              target="_blank"
            >
              <div className="border flex flex-col w-48 rounded-md hover:shadow-lg">
                <div className="flex-1 justify-center p-5 h-3/4">
                  <Image
                    src={"/PDF.png"}
                    alt="PDF"
                    className="w-full h-full"
                    width={50}
                    height={50}
                  />
                </div>
                <div className="border-t p-5 text-center">Fiche</div>
              </div>
            </Link>
          ) : null}
          <div className="flex flex-col space-y-2">
            <span>Observation</span>
            <hr />
            <ObservationForm
              id={intervention?.id}
              observation={intervention?.observations}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const affiche = (text: string | undefined | null) => {
  if (!text) {
    return "vide";
  }
  return text;
};
