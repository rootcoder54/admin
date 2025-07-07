"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { FicheVide } from "@/components/intervention/fiche-vide";
import { Intervention } from "@/components/intervention/intervention";

const PageIntervention = () => {

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
                  Liste des Interventions
                </BreadcrumbPage>
                <BreadcrumbSeparator />
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <FicheVide />
        </div>
        <div className="ml-auto px-3"></div>
      </header>
      <Intervention />
    </>
  );
};

export default PageIntervention;
