"use client";

import * as React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowDown, ArrowUp, ChevronsUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

import { format } from "date-fns";
import { Facture } from "@prisma/client";

function highlightMatch(text: string, search: string) {
  if (!search) return text;

  const regex = new RegExp(search.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "gi");
  const matches = [...text.matchAll(regex)];

  if (matches.length === 0) return text;

  const result: React.ReactNode[] = [];
  let lastIndex = 0;

  for (const match of matches) {
    const start = match.index!;
    const end = start + match[0].length;

    // Texte avant le match
    if (start > lastIndex) {
      result.push(text.slice(lastIndex, start));
    }

    // Match en surbrillance
    result.push(
      <span key={start} className="bg-yellow-500 text-zinc-950 font-semibold">
        {text.slice(start, end)}
      </span>
    );

    lastIndex = end;
  }

  // Texte après le dernier match
  if (lastIndex < text.length) {
    result.push(text.slice(lastIndex));
  }

  return result;
}

export const columns: ColumnDef<Facture>[] = [
  {
    id: "select",
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false
  },
  {
    accessorKey: "numero",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Numero
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
    cell: ({ row }) => <div className="capitalize">{row.original.numero}</div>
  },
  {
    accessorKey: "date",
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
    cell: ({ row }) => {
      return (
        <div className="group flex items-center">
          {format(row.original.date, "dd/MM/yyyy")}
        </div>
      );
    }
  },
  {
    accessorKey: "type",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Type
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
    cell: ({ row, column }) => {
      const value = row.original.type || "Aucun";
      const filter = column.getFilterValue() as string;
      return (
        <div className="flex items-center">
          {highlightMatch(value, filter || "")}
        </div>
      );
    }
  },
  {
    accessorKey: "acquittee",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Acquittée
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
    cell: ({ row }) => {
      const value = row.original.acquittee ? "Oui" : "Non";

      return <span className="capitalize">{value}</span>;
    }
  },
  {
    accessorKey: "client",
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
    cell: ({ row, column }) => {
      const value = row.original.clientId || "";
      const filter = column.getFilterValue() as string;
      return (
        <div className="flex items-center">
          {highlightMatch(value, filter || "")}
        </div>
      );
    },
    enableHiding: true
  },
  {
    accessorKey: "observation",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Observation
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
    cell: ({ row }) => {
      return (
        <div className="font-medium">{row.original.observation || "Aucun"}</div>
      );
    }
  }
];
