import { getClientId } from "@/action/client/get-clientId";
import { AddIntevention } from "@/components/intervention/addIntervention";
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
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

interface ClientIdPageProps {
  params: Promise<{ id: string }>;
}

const AddIntervention = async({ params }: ClientIdPageProps) => {
  const {id}=await params
  const client=await getClientId(id)

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
                  <Link href={`/client/${client?.id}`}>
                    {client?.nomClient}
                  </Link>
                </BreadcrumbPage>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage className="line-clamp-1">
                  Add Intervention
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="ml-auto px-3"></div>
      </header>
      <div className="mx-auto w-full max-w-[1280px] p-8 flex flex-col space-y-2">
        <div>
          <Link href={`/client/${client?.id}`}>
            <Button variant={"secondary"}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
        </div>
        <AddIntevention id={id} />
      </div>
    </div>
  );
};

export default AddIntervention;
