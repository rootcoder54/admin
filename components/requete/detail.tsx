"use client";

import { fetcher } from "@/lib/fetcher";
import { RequeteWithClient } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { Spinner } from "@/components/spinner";
import { Button } from "@/components/ui/button";
import { Edit2 } from "lucide-react";
import { DeleteRequete } from "./delete_requete";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";

export const DetailRequet = ({ id }: { id: string }) => {
  const router = useRouter();

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

  const reload = () => {
    router.push("/requete");
  };
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
                  {requete.sujet}{" "}
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
            <Button variant={"outline"} size={"lg"}>
              <Edit2 />
              Editer
            </Button>
            <DeleteRequete id={requete.id} reload={reload} />
          </div>
        </div>
        <hr />
        <div className="border rounded-md p-5 grid grid-cols-3 gap-4 gap-y-9">
          <div className="flex flex-col space-y-1">
            <span className="text-sm font-bold underline">Client :</span>
            <span className="text-sm">{requete.client.nomClient} </span>
          </div>

          <div className="flex flex-col space-y-1">
            <span className="text-sm font-bold underline">Demandeur :</span>
            <span className="text-sm">{requete.demandeur}</span>
          </div>

          <div className="flex flex-col space-y-1">
            <span className="text-sm font-bold underline">Date :</span>
            <span className="text-sm">
              {format(requete.dateDebut, "yyyy-MM-dd")}
            </span>
          </div>

          <div className="flex flex-col space-y-1">
            <span className="text-sm font-bold underline">Etat :</span>
            <span className="text-sm">
              <Badge>{requete.etat ? "TERMINE" : "EN_COURS"}</Badge>
            </span>
          </div>

          <div className="flex flex-col space-y-1">
            <span className="text-sm font-bold underline">Technicien :</span>
            <span className="text-sm">{requete.technicien}</span>
          </div>

          <div className="flex flex-col space-y-1">
            <span className="text-sm font-bold underline">Type :</span>
            <span className="text-sm">{requete.type}</span>
          </div>
        </div>
      </div>
    </>
  );
};
