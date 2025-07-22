"use client";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import DataTable from "@/components/facture/list";
import { columns } from "@/components/facture/list/colums";
import { Spinner } from "@/components/spinner";
import { useQuery } from "@tanstack/react-query";
import { fetcher } from "@/lib/fetcher";
import { FactureAll } from "@/types";

const FacturePage = () => {
  const { data: factures } = useQuery<FactureAll[]>({
    queryKey: ["factureid"],
    queryFn: () => fetcher(`/api/facture`)
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
                  Liste des factures
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="ml-auto px-3"></div>
      </header>
      {factures ? (
        <div className="flex w-full flex-col gap-4 px-3 pt-2">
          <DataTable columns={columns} data={factures} />
        </div>
      ) : (
        <div className="h-24 flex items-center w-full justify-center text-center">
          <Spinner size={"lg"} />
        </div>
      )}
    </>
  );
};

export default FacturePage;
