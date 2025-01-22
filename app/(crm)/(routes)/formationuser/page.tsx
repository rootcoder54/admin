"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage
} from "@/components/ui/breadcrumb";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { useQuery } from "@tanstack/react-query";
import { UserFormation } from "@prisma/client";
import { fetcher } from "@/lib/fetcher";
import { Spinner } from "@/components/spinner";

const PageFormationUser = () => {
  const {
    data: formations,
    error,
    isLoading
  } = useQuery<UserFormation[]>({
    queryKey: ["formationUser"],
    queryFn: () => fetcher(`/api/formationUser`)
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
                  Formation User
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="ml-auto px-3"></div>
      </header>

      {formations ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nom</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Date d'inscription</TableHead>
              <TableHead className="text-right">Profession</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {formations.map((formation) => (
              <TableRow key={formation.id}>
                <TableCell className="font-medium">{formation.nom}</TableCell>
                <TableCell>{formation.email}</TableCell>
                <TableCell>{`${formation.createdAt}`}</TableCell>
                <TableCell className="text-right">
                  {formation.profession}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <div className="h-24 flex items-center w-full justify-center text-center">
          <Spinner size={"lg"} />
        </div>
      )}
    </>
  );
};

export default PageFormationUser;
