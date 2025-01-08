import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { employes } from "./_component/employe";
import { columnsEmploye } from "./_component/colums";
import DataTableEmploye from "./_component/data-table";

const Page = () => {
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
                  Gestion des clients
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="ml-auto px-3"></div>
      </header>
      <div className="flex flex-1 flex-col gap-4 px-4">
        <div className="container mx-auto ">
          <DataTableEmploye columns={columnsEmploye} data={employes} />
        </div>
      </div>
    </>
  );
};

export default Page;
