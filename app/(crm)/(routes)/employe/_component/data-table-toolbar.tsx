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
import { importer } from "@/action/client/import";

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

  return (
    <div className="flex items-center gap-3 py-4">
      <div className="flex items-center gap-3">
        <Input
          placeholder="Filter par nom..."
          value={(table.getColumn("nom")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("nom")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        {isFiltered && (
          <Button
            variant="outline"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Annuler
            <X />
          </Button>
        )}
      </div>
    </div>
  );
}

export default DataToolBar;
