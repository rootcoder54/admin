"use client";

import { fetcher } from "@/lib/fetcher";
import { RequeteWithClient } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { SidebarTrigger } from "../ui/sidebar";
import { Separator } from "../ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "../ui/breadcrumb";
import Link from "next/link";
import { Spinner } from "../spinner";
import { Button } from "../ui/button";
import { FileX, PlusCircle } from "lucide-react";
import { Badge } from "../ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";

export const InterventionRequete = ({ id }: { id: string }) => {
  const { data: requete } = useQuery<RequeteWithClient>({
    queryKey: ["requeteid", id],
    queryFn: () => fetcher(`/api/requete/${id}`)
  });
  if (!requete) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Spinner size={"lg"} />
      </div>
    );
  }

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
                  <Link href={"/requete"}>Liste des Requêtes</Link>
                </BreadcrumbPage>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="line-clamp-1">
                  <Link href={`/requete/${id}`}>{requete.sujet} </Link>
                </BreadcrumbPage>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="line-clamp-1">
                  Intervention Requete
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="ml-auto px-3"></div>
      </header>
      <div className="mx-auto w-full max-w-[1280px] p-8 flex flex-col space-y-2">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-xl font-semibold space-x-2">
            Requête: {requete.sujet}{" "}
            <Badge>{requete.etat ? "TERMINE" : "EN_COURS"}</Badge>
          </h2>
          <div className="flex gap-x-3">
            <Link href={`/intervention/${requete.clientId}/add/${requete.id}`}>
              <Button variant={"gray"} size={"lg"}>
                <PlusCircle />
                Ajouter
              </Button>
            </Link>
          </div>
        </div>
        <hr />
        <div className="flex flex-col space-y-2">
          {requete.Intervention ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Sujet</TableHead>
                  <TableHead>Nature</TableHead>
                  <TableHead>Technicien</TableHead>
                  <TableHead>Service</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {requete.Intervention.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{requete.sujet}</TableCell>
                    <TableCell>{item.nature}</TableCell>
                    <TableCell>{item.intervenant}</TableCell>
                    <TableCell>{item.service}</TableCell>
                    <TableCell>
                      <Button>Details</Button>
                    </TableCell>
                  </TableRow>
                ))}
                {requete.Intervention.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center">
                      Aucune intervention pour cette requête
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          ) : (
            <div className="border rounded-md p-5 flex flex-col items-center justify-center space-y-4">
              <FileX className="size-11" />
              <span> Aucune intervention pour cette requête</span>
              <Link
                href={`/intervention/${requete.clientId}/add/${requete.id}`}
              >
                <Button variant={"blue"} size={"lg"}>
                  <PlusCircle className="size-11" /> Ajouter{" "}
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
