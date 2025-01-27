"use client";
import { Spinner } from "@/components/spinner";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { fetcher } from "@/lib/fetcher";
import { ClientList } from "@/types";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

export const ClientComponent = ({ clientId }: { clientId: string }) => {
  const { data: client } = useQuery<ClientList>({
    queryKey: ["clientId", clientId],
    queryFn: () => fetcher(`/api/client/${clientId}`)
  });

  if (!client) {
    <div className="flex justify-center items-center">
      <Spinner />
    </div>;
  }
  return (
    <div>
      <header className="flex h-14 shrink-0 items-center gap-2">
        <div className="flex flex-1 items-center gap-2 px-3">
          <SidebarTrigger />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbPage className="line-clamp-1">
                  <Link href={"/client"}>Liste de clients</Link>
                </BreadcrumbPage>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="line-clamp-1">
                  {client?.nomClient}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="ml-auto px-3"></div>
      </header>
      {client?.nomClient}
    </div>
  );
};
