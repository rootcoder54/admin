"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Skeleton } from "@/components/ui/skeleton";
import { TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { fetcher } from "@/lib/fetcher";
import { ClientList } from "@/types";
import { Tabs } from "@radix-ui/react-tabs";
import { useQuery } from "@tanstack/react-query";
import { Edit2, ListCheck, Trash2 } from "lucide-react";
import Link from "next/link";
import { Intervention } from "@/components/intervention/intervention";
import { ContactList } from "@/components/contact/contact";
import { BaseList } from "@/components/base/base";
import { LogicielList } from "@/components/logiciel/logiciel";

export const ClientComponent = ({ clientId }: { clientId: string }) => {
  const { data: client } = useQuery<ClientList>({
    queryKey: ["clientId", clientId],
    queryFn: () => fetcher(`/api/client/${clientId}`)
  });

  if (!client) {
    return <SkeletonClient />;
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
                  <Link href={"/client"}>Liste des clients</Link>
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
      <div className="mx-auto w-full max-w-[1280px] p-8 flex flex-col space-y-2">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-xl font-semibold">{client?.nomClient}</h2>
          <div className="flex gap-x-3">
            <Button variant={"secondary"}>
              <ListCheck />
              Licence
            </Button>
            <Button variant={"outline"}>
              <Edit2 />
              Editer
            </Button>
            <Button variant={"danger"}>
              <Trash2 />
              Supprimer
            </Button>
          </div>
        </div>
        <hr />
        <div className="border rounded-md flex flex-row items-center justify-between gap-x-2 p-5">
          {client?.numero && (
            <div className="flex flex-col">
              <span className="text-sm text-neutral-600 dark:text-neutral-400">
                Numero
              </span>
              <span className="text-sm">{client?.numero}</span>
            </div>
          )}
          {client?.dateInscription && (
            <div className="flex flex-col">
              <span className="text-sm text-neutral-600 dark:text-neutral-400">
                Date d&apos;inscription
              </span>
              <span className="text-sm">{String(client?.dateInscription)}</span>
            </div>
          )}
          {client?.adresse && (
            <div className="flex flex-col">
              <span className="text-sm text-neutral-600 dark:text-neutral-400">
                Adresse
              </span>
              <span className="text-sm">{client?.adresse}</span>
            </div>
          )}
          {client?.activite && (
            <div className="flex flex-col">
              <span className="text-sm text-neutral-600 dark:text-neutral-400">
                Activité
              </span>
              <span className="text-sm">{client?.activite}</span>
            </div>
          )}
        </div>
        <Tabs defaultValue="Intervention">
          <TabsList className="">
            <TabsTrigger value="Intervention">Intervention</TabsTrigger>
            <TabsTrigger value="Base">Licence</TabsTrigger>
            <TabsTrigger value="contact">Contact</TabsTrigger>
            <TabsTrigger value="contrat">Contrat</TabsTrigger>
          </TabsList>
          <TabsContent value="Intervention">
            <Intervention clientId={clientId} />
          </TabsContent>
          <TabsContent value="Base">
            <div className="space-y-3">
              <LogicielList clientId={clientId} />
              <hr />
              <BaseList clientId={clientId} />
            </div>
          </TabsContent>
          <TabsContent value="contact">
            <ContactList clientId={clientId} />
          </TabsContent>
          <TabsContent value="contrat">
            <span>Contrat</span>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export function SkeletonClient() {
  return (
    <div>
      <div className="mx-auto w-full max-w-[1280px] p-8 flex flex-col space-y-2">
        <div className="flex flex-row justify-between items-center">
          <Skeleton className="h-4 w-[200px]" />
          <div className="flex gap-x-3">
            <Skeleton className="h-4 w-[90px]" />
            <Skeleton className="h-4 w-[90px]" />
          </div>
        </div>
        <div className="border rounded-md flex flex-row items-center justify-between gap-x-2 p-5">
          <div className="flex flex-col">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
          <div className="flex flex-col">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
          <div className="flex flex-col">
            <Skeleton className="h-4 w-[100px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
        <div className="flex flex-col space-y-2">
          <Skeleton className="h-4 w-[500px]" />
          <Skeleton className="h-4 w-[500px]" />
          <Skeleton className="h-4 w-[500px]" />
          <Skeleton className="h-4 w-[500px]" />
          <Skeleton className="h-4 w-[500px]" />
        </div>
      </div>
    </div>
  );
}
