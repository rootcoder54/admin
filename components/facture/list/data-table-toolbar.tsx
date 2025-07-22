"use client";
import { Button } from "@/components/ui/button";
import { Table } from "@tanstack/react-table";
import { ChevronDown, PlusIcon, X } from "lucide-react";

import Link from "next/link";

import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

function DataToolBar<TData>({ table }: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center gap-3 py-4">
      <div className="flex md:flex-row flex-col gap-3">
        <div className="flex items-center gap-3">
          <Input
            placeholder="Filter observation..."
            value={
              (table.getColumn("observation")?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table.getColumn("observation")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />

          {isFiltered && (
            <Button
              variant="destructive"
              onClick={() => {
                table.resetColumnFilters();
              }}
              className="h-8 px-2 lg:px-3"
            >
              Effacer les filtres
              <X />
            </Button>
          )}
          <Link href={`/facture/add`}>
            <Button variant="blue" size={"sm"}>
              <PlusIcon />
              Ajouter
            </Button>
          </Link>
        </div>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" className="ml-auto">
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
