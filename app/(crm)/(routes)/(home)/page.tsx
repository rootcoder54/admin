import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  Calendar,
  HelpCircle,
  FileArchive,
  ArrowBigDownIcon
} from "lucide-react";
import Image from "next/image";
import { ItemNotice } from "./_component/card";

export default function Page() {
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
                  Page d&apos;accueil
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="ml-auto px-3"></div>
      </header>
      <div className="flex flex-col justify-start items-start gap-4 py-10 px-10">
        <h3 className="text-xl ">Dashboard</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
          <div className="max-w-3xl rounded-2xl shadow-md bg-zinc-100 dark:bg-zinc-800 p-6">
            <div className="flex flex-row items-center gap-4">
              <div className="flex flex-col items-start gap-4">
                <h1 className="text-3xl font-normal text-zinc-900 dark:text-zinc-100">
                  Hello
                </h1>
                <span className="text-lg text-zinc-600 dark:text-zinc-300">
                  Bienvenue sur votre tableau de bord.
                </span>
                <div className="grid grid-cols-1 gap-2">
                  <a
                    href={"/support"}
                    className="flex items-center gap-2 hover:underline"
                  >
                    <HelpCircle className="text-green-800" />
                    Support
                  </a>
                  <a
                    href={"/formation"}
                    className="flex items-center gap-2 hover:underline"
                  >
                    <FileArchive className="text-yellow-800" />
                    Formation
                  </a>
                  <a
                    href={"/tache"}
                    className="flex items-center gap-2 hover:underline"
                  >
                    <Calendar className="text-blue-600" />
                    Taches
                  </a>
                  <a
                    href={"/telechargement"}
                    className="flex items-center gap-2 hover:underline"
                  >
                    <ArrowBigDownIcon className="text-yellow-600" />
                    Telechargement
                  </a>
                </div>
              </div>
              <Image
                src={"/dashboard.png"}
                alt="dashboard"
                className="rotate-6 w-full hidden lg:block"
                width={400}
                height={400}
              />
            </div>
          </div>
          <ItemNotice />
        </div>
      </div>
    </>
  );
}
