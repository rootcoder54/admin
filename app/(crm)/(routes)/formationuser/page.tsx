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
import { getFormations } from "@/data/formation/userFormation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage
} from "@/components/ui/breadcrumb";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";

const PageFormationUser = async () => {
  const formations = await getFormations();
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
                  Formation User
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
        <div className="ml-auto px-3"></div>
      </header>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nom</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Date d'inscription</TableHead>
            <TableHead className="text-right">Profession</TableHead>
          </TableRow>
        </TableHeader>
        {formations && (
          <TableBody>
            {formations.map((formation) => (
              <TableRow key={formation.id}>
                <TableCell className="font-medium">{formation.nom}</TableCell>
                <TableCell>{formation.email}</TableCell>
                <TableCell>
                  {`${formation.createdAt.getDate()} / 0${
                    formation.createdAt.getMonth() + 1
                  } / ${formation.createdAt.getFullYear()}`}
                </TableCell>
                <TableCell className="text-right">
                  {formation.profession}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        )}
      </Table>
    </div>
  );
};

export default PageFormationUser;
