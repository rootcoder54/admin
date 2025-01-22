import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table } from "@tanstack/react-table";
import {
  X
} from "lucide-react";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

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
