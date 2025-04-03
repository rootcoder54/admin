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
import { Base } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";

import { Spinner } from "../spinner";
import { AddBase } from "./addBase";
import { DeleteBase } from "./deleteBase";

export const BaseList = ({ clientId }: { clientId: string }) => {
  const { data, refetch } = useQuery<Base[]>({
    queryKey: ["baseId", clientId],
    queryFn: () => fetcher(`/api/base/${clientId}`)
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
          Base de Donnée
        </h2>
        <AddBase clientId={clientId} reload={() => refetch()} />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Societé</TableHead>
            <TableHead>Convention</TableHead>
            <TableHead>Chemin</TableHead>
            <TableHead>Poste</TableHead>
            <TableHead>Employé</TableHead>
            <TableHead>action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">{item.societe}</TableCell>
              <TableCell>{item.convention}</TableCell>
              <TableCell>{item.chemin}</TableCell>
              <TableCell>{item.poste}</TableCell>
              <TableCell>{item.employe}</TableCell>
              <TableCell className="flex space-x-2">
                <DeleteBase id={item.id} reload={() => refetch()} />
                {/*
                  <EditeContact
                    id={item.id}
                    nom={item.nom}
                    telephone={item.telephone}
                    email={item.email}
                    poste={item.poste}
                    clientId={item.clientId}
                    reload={() => refetch()}
                  />
                */}
              </TableCell>
            </TableRow>
          ))}
          {data.length === 0 && (
            <TableRow>
              <TableCell colSpan={6} className="text-center">
                Pas de Base enregistré
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
