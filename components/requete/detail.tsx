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
import { Edit2 } from "lucide-react";
import { DeleteRequete } from "./delete_requete";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { Badge } from "../ui/badge";

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
          <h2 className="text-xl font-semibold">
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
        <div className="border rounded-md flex flex-row items-center justify-between gap-x-2 p-5">
          <div className="flex flex-col">
            <span className="text-sm text-neutral-600 dark:text-neutral-400">
              Client
            </span>
            <span className="text-sm">{requete.client.nomClient} </span>
          </div>

          <div className="flex flex-col">
            <span className="text-sm text-neutral-600 dark:text-neutral-400">
              Demandeur
            </span>
            <span className="text-sm">{requete.demandeur}</span>
          </div>

          <div className="flex flex-col">
            <span className="text-sm text-neutral-600 dark:text-neutral-400">
              Date
            </span>
            <span className="text-sm">
              {format(requete.dateDebut, "yyyy-MM-dd")}
            </span>
          </div>
        </div>

        <div className="border rounded-md flex flex-row items-center justify-between gap-x-2 p-5">
          <div className="flex flex-col">
            <span className="text-sm text-neutral-600 dark:text-neutral-400">
              Etat
            </span>
            <span className="text-sm">
              <Badge>{requete.etat ? "TERMINE" : "EN_COURS"}</Badge>
            </span>
          </div>

          <div className="flex flex-col">
            <span className="text-sm text-neutral-600 dark:text-neutral-400">
              Technicien
            </span>
            <span className="text-sm">{requete.technicien}</span>
          </div>

          <div className="flex flex-col">
            <span className="text-sm text-neutral-600 dark:text-neutral-400">
              Type
            </span>
            <span className="text-sm">{requete.type}</span>
          </div>
        </div>
      </div>
    </>
  );
};
