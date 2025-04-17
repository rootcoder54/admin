"use client";

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
import { RequeteWithClient } from "@/types";
import DataTable from "@/components/requete/list";
import { columns } from "@/components/requete/list/colums";

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
        <div className="flex w-full flex-col gap-4 px-3 pt-2">
          <DataTable columns={columns} data={requetes} reload={refetch} />
        </div>
      ) : (
        <div className="h-24 flex items-center w-full justify-center text-center">
          <Spinner size={"lg"} />
        </div>
      )}
    </>
  );
};

export default PageRequete;
