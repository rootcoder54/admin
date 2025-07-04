"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { useQuery } from "@tanstack/react-query";
import { fetcher } from "@/lib/fetcher";
import { Spinner } from "@/components/spinner";
import { InterventionAll } from "@/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { format } from "date-fns";
import Link from "next/link";
import { FicheVide } from "@/components/intervention/fiche-vide";

const PageIntervention = () => {
  const { data: interventions } = useQuery<InterventionAll[]>({
    queryKey: ["interventionId"],
    queryFn: () => fetcher(`/api/intervention`)
  });
  return (
    <>
      <header className="flex h-14 shrink-0 items-center gap-2">
        <div className="flex flex-1 items-center gap-2 px-3">
          <SidebarTrigger />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbPage className="line-clamp-1">
                  Liste des Interventions
                </BreadcrumbPage>
                <BreadcrumbSeparator />
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <FicheVide />
        </div>
        <div className="ml-auto px-3"></div>
      </header>
      {/*requetes ? (
        <div className="flex w-full flex-col gap-4 px-3 pt-2">
          <DataTable columns={columns} data={requetes} reload={refetch} />
        </div>
      ) : (
        <div className="h-24 flex items-center w-full justify-center text-center">
          <Spinner size={"lg"} />
        </div>
      )*/}
      {interventions ? (
        <div className="flex w-full flex-col gap-4 px-10 pt-2">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Intervenant</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Nature</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {interventions.map((intervention) => (
                <TableRow key={intervention.id}>
                  <TableCell>
                    {format(intervention.dateCloture, "dd/MM/yyyy")}
                  </TableCell>
                  <TableCell>{intervention.intervenant}</TableCell>
                  <TableCell>{intervention.client.nomClient}</TableCell>
                  <TableCell>{intervention.nature}</TableCell>
                  <TableCell>
                    <Link
                      href={`/imprime/fiche/item/${intervention.id}`}
                      target="_blank"
                    >
                      Fiche
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="h-24 flex items-center w-full justify-center text-center">
          <Spinner size={"lg"} />
        </div>
      )}
    </>
  );
};

export default PageIntervention;
