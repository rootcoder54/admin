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
    <div className="flex items-center py-4">
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
