"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { fetcher } from "@/lib/fetcher";
import { Contrat } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

import { Spinner } from "../spinner";
import { format } from "date-fns";
import { AddContrat } from "./addContrat";
import { DeleteContrat } from "./deleteContrat";

export const ContratList = ({ clientId }: { clientId: string }) => {
  const { data, refetch } = useQuery<Contrat[]>({
    queryKey: ["contratId", clientId],
    queryFn: () => fetcher(`/api/contrat/${clientId}`)
  });
  if (!data) {
    return (
      <div className="w-full flex items-center justify-center p-6">
        <Spinner size={"icon"} />
      </div>
    );
  }
  return (
    <div className="w-full flex flex-col space-y-2 p-5 border rounded-md">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-neutral-600 dark:text-neutral-400">
          Contrat
        </h2>
        <AddContrat clientId={clientId} reload={() => refetch()} />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Debut</TableHead>
            <TableHead>Fin</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Reconduction</TableHead>
            <TableHead>action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">
                {format(item.dateDebut, "yyyy-MM-dd")}
              </TableCell>
              <TableCell>{format(item.dateFin, "yyyy-MM-dd")}</TableCell>
              <TableCell>{item.type}</TableCell>
              <TableCell>{item.reconduction}</TableCell>
              <TableCell className="flex space-x-2">
                <DeleteContrat id={item.id} reload={refetch} />
              </TableCell>
            </TableRow>
          ))}
          {data.length === 0 && (
            <TableRow>
              <TableCell colSpan={5} className="text-center py-8">
                Pas de contrat
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
