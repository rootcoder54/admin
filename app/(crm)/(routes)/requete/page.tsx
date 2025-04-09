"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage
} from "@/components/ui/breadcrumb";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { useQuery } from "@tanstack/react-query";
import { fetcher } from "@/lib/fetcher";
import { Spinner } from "@/components/spinner";
import { format } from "date-fns";
import { RequeteWithClient } from "@/types";
import { DeleteRequete } from "@/components/requete/delete_requete";

const PageRequete = () => {
  const { data: requetes, refetch } = useQuery<RequeteWithClient[]>({
    queryKey: ["requeteid"],
    queryFn: () => fetcher(`/api/requete`)
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
                  Liste des requêtes
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="ml-auto px-3"></div>
      </header>

      {requetes ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Sujet</TableHead>
              <TableHead>Technicien</TableHead>
              <TableHead>Client</TableHead>
              <TableHead>Etat</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {requetes.map((requete) => (
              <TableRow key={requete.id}>
                <TableCell className="font-medium">
                  {format(requete.dateDebut, "yyyy-MM-dd")}
                </TableCell>
                <TableCell>{requete.sujet}</TableCell>
                <TableCell>{requete.technicien}</TableCell>
                <TableCell>{requete.client.nomClient}</TableCell>
                <TableCell>{!requete.etat ? "EN_COURS" : "TERMINE"}</TableCell>
                <TableCell>
                  <DeleteRequete id={requete.id} reload={refetch} />
                </TableCell>
              </TableRow>
            ))}
            {requetes.length === 0 && (
              <TableRow className="h-24 w-full items-center justify-center text-center">
                <TableCell colSpan={6}>
                  <div className="flex w-full items-center justify-center text-center">
                    Aucune requête
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      ) : (
        <div className="h-24 flex items-center w-full justify-center text-center">
          <Spinner size={"lg"} />
        </div>
      )}
    </>
  );
};

export default PageRequete;
