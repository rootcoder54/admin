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
import { Logiciel } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

import { Spinner } from "../spinner";
import { DeleteBase } from "./deleteLogiciel";
import { AddLogiciel } from "./addLogiciel";

export const LogicielList = ({ clientId }: { clientId: string }) => {
  const { data, refetch } = useQuery<Logiciel[]>({
    queryKey: ["logicielId", clientId],
    queryFn: () => fetcher(`/api/logiciel/${clientId}`)
  });
  if (!data) {
    return (
      <div className="w-full flex items-center justify-center p-6">
        <Spinner size={"lg"} />
      </div>
    );
  }
  return (
    <div className="w-full flex flex-col space-y-2 p-5 border rounded-md">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-neutral-600 dark:text-neutral-400">
          Logiciel
        </h2>
        <AddLogiciel clientId={clientId} reload={() => refetch()} />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Logiciel</TableHead>
            <TableHead>Version Interne</TableHead>
            <TableHead>Poste</TableHead>
            <TableHead>Employé</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Dossier installatio</TableHead>
            <TableHead>action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">{item.nom} - {item.version}</TableCell>
              <TableCell>{item.versionInterne}</TableCell>
              <TableCell>{item.poste}</TableCell>
              <TableCell>{item.employe}</TableCell>
              <TableCell>{item.type}</TableCell>
              <TableCell>{item.dossier}</TableCell>
              <TableCell className="flex space-x-2">
                <DeleteBase id={item.id} reload={() => refetch()} />
              </TableCell>
            </TableRow>
          ))}
          {data.length === 0 && (
            <TableRow>
              <TableCell colSpan={7} className="text-center">
                Pas de Logiciel enregistré
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
