import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Table } from "@tanstack/react-table";
import {
  CheckCircle,
  ChevronDown,
  Gamepad,
  Home,
  Telescope,
  X
} from "lucide-react";
import DataTableFilter from "./data-table-filter";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}
const activites = [
  {
    value: "Immobilier",
    label: "Immobilier",
    icon: Home
  },
  {
    value: "Technologie",
    label: "Technologie",
    icon: Telescope
  },
  {
    value: "Jeux vidéo",
    label: "Jeux vidéo",
    icon: Gamepad
  },
  {
    value: "Tourisme",
    label: "Tourisme",
    icon: CheckCircle
  }
];
function DataToolBar<TData>({ table }: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;
  const rowSelected = table.getState().rowSelection;
  const [nom, setNom] = useState("");
  const [adresse, setAdresse] = useState("");
  const [activite, setActivite] = useState("");
  const selectedRowsData = table
    .getRowModel()
    .rows.filter((row) => rowSelected[row.id]); // Récupérer les données des lignes sélectionnées
  useEffect(() => {
    selectedRowsData.forEach((row) => {
      const rowData = row.original;
      setNom(rowData.nom);
      setAdresse(rowData.adresse);
      setActivite(rowData.activite);
      ///console.log("Nom de la ligne sélectionnée :", rowData.nom);
      //console.log("Activité de la ligne sélectionnée :", rowData.activite);
    });
  }, [selectedRowsData]);

  return (
    <div className="flex items-center gap-3 py-4">
      <div className="flex items-center gap-3">
        <Input
          placeholder="Filter nom..."
          value={(table.getColumn("nom")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("nom")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        {table.getColumn("activite") && (
          <DataTableFilter
            column={table.getColumn("activite")}
            title="Activité"
            options={activites}
          />
        )}
        {isFiltered && (
          <Button
            variant="destructive"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Annuler
            <X />
          </Button>
        )}
      </div>
      <div className="flex items-center gap-3">
        {table.getFilteredSelectedRowModel().rows.length === 1 && (
          <>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">Modifier</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Edité Client</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Nom Client
                    </Label>
                    <Input
                      id="name"
                      defaultValue={nom}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="username" className="text-right">
                      Adresse
                    </Label>
                    <Input
                      id="username"
                      defaultValue={adresse}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="username" className="text-right">
                      Activité
                    </Label>
                    <Input
                      id="username"
                      defaultValue={activite}
                      className="col-span-3"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" variant={"default"}>
                    Sauvegarder
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <Button variant={"secondary"}>Fiche vide</Button>
          </>
        )}
        {table.getFilteredSelectedRowModel().rows.length !== 0 && (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant={"destructive"}>Supprimer</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Etez-vous sûr ?</AlertDialogTitle>
                <AlertDialogDescription>
                  Cette action ne peut pas être annulée. Cela supprimera
                  définitivement le client et supprimera les données de nos
                  serveurs.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Annuler</AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => {
                    toast.error(`Client ${nom} a été Supprimé !`);
                  }}
                  className="bg-red-500 hover:bg-red-400 text-white"
                >
                  Supprimer
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="ml-auto">
            Colonne <ChevronDown className="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {table
            .getAllColumns()
            .filter((column) => column.getCanHide())
            .map((column) => {
              return (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              );
            })}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default DataToolBar;
