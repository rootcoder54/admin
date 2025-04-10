"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";

import React from "react";
import DataToolBar from "./data-table-toolbar";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  reload: () => void;
}

function DataTable<TData, TValue>({
  columns,
  data,
  reload
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: (updater) => {
      setRowSelection((prev) => {
        const newSelection =
          typeof updater === "function" ? updater(prev) : updater;

        const selectedRowIds = Object.keys(newSelection);

        // Si on vient de sélectionner une ligne
        if (selectedRowIds.length > 0) {
          // Prend uniquement la dernière ligne cliquée
          const lastSelected = selectedRowIds[selectedRowIds.length - 1];
          return { [lastSelected]: true };
        }

        // Sinon, aucune ligne sélectionnée
        return {};
      });
    },
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection
    }
  });

  return (
    <div className="w-full h-full">
      <div className="container mx-auto">
        <DataToolBar table={table} reload={reload} />
      </div>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow className="" key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                className=""
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                onClick={() => {
                  const isSelected = row.getIsSelected();

                  // Si la ligne est déjà sélectionnée, on la désélectionne
                  if (isSelected) {
                    table.setRowSelection({});
                  } else {
                    // Sinon on sélectionne uniquement cette ligne
                    table.setRowSelection({ [row.id]: true });
                  }
                }}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                Pas de resultat trouvé.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      {/* <DataTablePagination table={table} /> */}
    </div>
  );
}

export default DataTable;
