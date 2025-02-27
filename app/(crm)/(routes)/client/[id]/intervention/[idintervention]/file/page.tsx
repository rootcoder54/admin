import { getInterventionId } from "@/action/intervention/get-intervention";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";

import Link from "next/link";

import { FicheIntervention } from "@/components/intervention/documentIntervention";

interface IdPageProps {
  params: Promise<{ idintervention: string }>;
}

const PageIntervention = async ({ params }: IdPageProps) => {
  const { idintervention } = await params;
  const intervention = await getInterventionId(idintervention);
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
                  <Link href={`/client/${intervention?.clientId}`}>
                    {intervention?.client.nomClient}
                  </Link>
                </BreadcrumbPage>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="line-clamp-1">
                  <Link
                    href={`/client/${intervention?.clientId}/intervention/${intervention?.id}`}
                  >
                    Intervention
                  </Link>
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="ml-auto px-3"></div>
      </header>
      <div className="mx-auto w-full max-w-[1280px] p-8 flex flex-col space-y-2">
        <FicheIntervention
          idClient={intervention?.clientId}
          idIntervention={idintervention}
        />
      </div>
    </div>
  );
};

export default PageIntervention;
