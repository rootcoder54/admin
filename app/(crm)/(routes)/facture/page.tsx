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
import { Facture } from "@prisma/client";
import { Spinner } from "@/components/spinner";

const FacturePage = () => {
  const factures: Facture[] = [
    {
      id: "1",
      numero: "2025/0001/14",
      date: new Date(),
      clientId: "client1",
      type: "Vente",
      acquittee: true,
      observation: "Première facture",
      numeroOrdre: 1,
      modeReglement: "Espèces",
      devise: "CFA",
      totalHT: 10491000,
      remise: 0,
      totalTTC: 12379380,
      totalTVA: 1888380,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: "2",
      numero: "2025/0002/24",
      date: new Date(),
      clientId: "client45",
      type: "",
      acquittee: false,
      observation: "Deuxième facture",
      numeroOrdre: 2,
      modeReglement: "Virement",
      devise: "CFA",
      totalHT: 10491000,
      remise: 0,
      totalTTC: 12379380,
      totalTVA: 1888380,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ];
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
