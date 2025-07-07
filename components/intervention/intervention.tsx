"use client";
import { Button } from "@/components/ui/button";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  getFilteredRowModel
} from "@tanstack/react-table";
import { Table as TableS } from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import {
  ArrowDown,
  ArrowUp,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  ChevronsUpDown,
  Edit,
  Folder,
  MoreHorizontal,
  Printer,
  SlidersHorizontal,
  X
} from "lucide-react";
import { ClientList, InterventionAll } from "@/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { useQuery } from "@tanstack/react-query";
import { fetcher } from "@/lib/fetcher";
import { Spinner } from "@/components/spinner";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Input } from "../ui/input";
import { format } from "date-fns";
import ClientFilter from "../requete/list/client-filter";

import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { FilterDateIntervention } from "./date-range-picker";

import { FilterFn } from "@tanstack/react-table";

const dateBetween: FilterFn<InterventionAll> = (
  row,
  columnId,
  filterValue: [Date | undefined, Date | undefined]
) => {
  const [start, end] = filterValue ?? [];
  const cellDate = new Date(row.getValue(columnId));

  if (start && cellDate < start) return false;
  if (end && cellDate > end) return false;

  return true;
};

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

const columns: ColumnDef<InterventionAll>[] = [
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
          {column.getIsSorted() === "desc" ? (
            <ArrowDown />
          ) : column.getIsSorted() === "asc" ? (
            <ArrowUp />
          ) : (
            <ChevronsUpDown />
          )}
        </Button>
      );
    },
    filterFn: dateBetween,
    cell: ({ row }) => {
      return (
        <div className="font-medium">
          {row.original.dateCloture &&
            format(row.original.dateCloture, "yyyy-MM-dd")}
        </div>
      );
    }
  },
  {
    accessorKey: "nature",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nature
          {column.getIsSorted() === "desc" ? (
            <ArrowDown />
          ) : column.getIsSorted() === "asc" ? (
            <ArrowUp />
          ) : (
            <ChevronsUpDown />
          )}
        </Button>
      );
    },
    cell: ({ row }) => <div className="lowercase">{row.original.nature}</div>
  },
  {
    accessorKey: "clientId",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Client
          {column.getIsSorted() === "desc" ? (
            <ArrowDown />
          ) : column.getIsSorted() === "asc" ? (
            <ArrowUp />
          ) : (
            <ChevronsUpDown />
          )}
        </Button>
      );
    },
    filterFn: (row, columnId, filterValue) => {
      return filterValue.includes(row.getValue(columnId));
    },
    cell: ({ row }) => <div className="">{row.original.client.nomClient}</div>
  },
  {
    accessorKey: "intervenant",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Technicien
          {column.getIsSorted() === "desc" ? (
            <ArrowDown />
          ) : column.getIsSorted() === "asc" ? (
            <ArrowUp />
          ) : (
            <ChevronsUpDown />
          )}
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="capitalize">{row.original.intervenant}</div>
    )
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const intervention = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>
              <Link
                href={`/intervention/detail/${intervention.id}`}
                className="w-full flex items-center justify-start gap-x-2"
              >
                <Folder /> Details
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link
                href={`/imprime/fiche/item/${intervention.id}`}
                target="_blank"
                className="w-full flex items-center justify-start gap-x-2"
              >
                <Printer /> Fiche réélle
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Edit /> Editer
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    }
  }
];
interface DataTableToolbarProps<TData> {
  table: TableS<TData>;
}

function ToolBar<TData>({ table }: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center gap-3">
      <SearchFilter table={table} />
      <Input
        placeholder="Filter par technicien..."
        value={
          (table.getColumn("intervenant")?.getFilterValue() as string) ?? ""
        }
        onChange={(event) =>
          table.getColumn("intervenant")?.setFilterValue(event.target.value)
        }
        className="max-w-sm"
      />
      {isFiltered && (
        <Button
          variant="destructive"
          onClick={() => table.resetColumnFilters()}
          className="h-8 px-2 lg:px-3"
        >
          Effacer le filtre
          <X />
        </Button>
      )}
    </div>
  );
}

export const Intervention = () => {
  const { data } = useQuery<InterventionAll[]>({
    queryKey: ["InterventionId"],
    queryFn: () => fetcher(`/api/intervention`)
  });
  if (!data) {
    return (
      <div className="w-full flex items-center justify-center p-6">
        <Spinner size={"icon"} />
      </div>
    );
  }
  return (
    <div className="w-full flex flex-col space-y-2 p-5 rounded-md">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-neutral-600 dark:text-neutral-400">
          Interventions
        </h2>
      </div>
      <ItemIntervention columns={columns} data={data} />
    </div>
  );
};

const ItemIntervention = <TData, TValue>({
  columns,
  data
}: DataTableProps<TData, TValue>) => {
  const table = useReactTable({
    data,
    columns,
    filterFns: {
      dateBetween
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel()
  });
  return (
    <div className="w-full space-y-2">
      <ToolBar table={table} />
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
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
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                className="border-b"
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
                Aucune Intervention enregistré.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="flex items-center justify-between px-2">
        <div></div>
        <div className="flex items-center space-x-6 lg:space-x-8">
          <div className="flex items-center space-x-2">
            <p className="text-sm font-medium">Lignes par page</p>
            <Select
              value={`${table.getState().pagination.pageSize}`}
              onValueChange={(value) => {
                table.setPageSize(Number(value));
              }}
            >
              <SelectTrigger className="h-8 w-[70px]">
                <SelectValue
                  placeholder={table.getState().pagination.pageSize}
                />
              </SelectTrigger>
              <SelectContent side="top">
                {[10, 20, 30, 40, 50].map((pageSize) => (
                  <SelectItem key={pageSize} value={`${pageSize}`}>
                    {pageSize}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex w-[100px] items-center justify-center text-sm font-medium">
            Page {table.getState().pagination.pageIndex + 1} de{" "}
            {table.getPageCount()}
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={() => table.setPageIndex(0)}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Go to first page</span>
              <ChevronsLeft />
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <span className="sr-only">Go to previous page</span>
              <ChevronLeft />
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Go to next page</span>
              <ChevronRight />
            </Button>
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={() => table.setPageIndex(table.getPageCount() - 1)}
              disabled={!table.getCanNextPage()}
            >
              <span className="sr-only">Go to last page</span>
              <ChevronsRight />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

function SearchFilter<TData>({ table }: DataTableToolbarProps<TData>) {
  const { data: clients } = useQuery<ClientList[]>({
    queryKey: ["clients"],
    queryFn: () => fetcher(`/api/client`)
  });

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">
          <SlidersHorizontal />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-auto dark:bg-stone-800"
        side="bottom"
        align="start"
      >
        <div className="flex flex-col space-y-4">
          <div className="flex items-center space-x-2">
            <Label className="w-36" htmlFor="search">
              Technicien
            </Label>
            <Input
              placeholder="Technicien ..."
              value={
                (table.getColumn("intervenant")?.getFilterValue() as string) ??
                ""
              }
              onChange={(event) =>
                table
                  .getColumn("intervenant")
                  ?.setFilterValue(event.target.value)
              }
              className="max-w-sm"
            />
          </div>

          <div className="flex items-center space-x-2">
            <Label className="w-36" htmlFor="search">
              Nature
            </Label>
            <Input
              placeholder="Nature..."
              value={
                (table.getColumn("nature")?.getFilterValue() as string) ?? ""
              }
              onChange={(event) =>
                table.getColumn("nature")?.setFilterValue(event.target.value)
              }
              className="max-w-sm"
            />
          </div>

          <div className="flex items-center space-x-2">
            <Label className="w-36" htmlFor="">
              Date
            </Label>
            <FilterDateIntervention table={table} />
          </div>

          <div className="flex items-center space-x-2">
            <Label className="w-36" htmlFor="client">
              Client
            </Label>
            {table.getColumn("clientId") && (
              <ClientFilter
                column={table.getColumn("clientId")}
                title="Client"
                options={clients?.map((client) => ({
                  label: client.nomClient,
                  value: client.id
                }))}
              />
            )}
          </div>

          <PopoverClose asChild>
            <Button variant="blue">Filtrer</Button>
          </PopoverClose>
        </div>
      </PopoverContent>
    </Popover>
  );
}
