"use client";

import * as React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowDown, ArrowUp, ChevronsUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

import { format } from "date-fns";
import { RequeteWithClient } from "@/types";
import DetailRequet from "../detail_requete";
import { dateBetween } from "./date-filter";

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

export const columns: ColumnDef<RequeteWithClient>[] = [
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
    cell: ({ row }) => (
      <div className="capitalize">
        {format(row.original.dateDebut, "yyyyMMdd_HHmm_")}
        {row.original.logiciel ? row.original.logiciel : "RHPaie"}_#
      </div>
    )
  },
  {
    accessorKey: "sujet",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Sujet
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
      const value = row.getValue<string>("sujet") || "";
      const filter = column.getFilterValue() as string;
      return (
        <div className="group flex items-center">
          {highlightMatch(value, filter || "")}
          <div className="hidden group-hover:block items-center">
            <DetailRequet id={row.original.id} />
          </div>
        </div>
      );
    }
  },
  {
    accessorKey: "technicien",
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
    cell: ({ row, column }) => {
      const value = row.getValue<string>("technicien") || "";
      const filter = column.getFilterValue() as string;
      return (
        <div className="flex items-center">
          {highlightMatch(value, filter || "")}
        </div>
      );
    }
  },
  {
    accessorKey: "logiciel",
    enableHiding: true
  },
  {
    accessorKey: "demandeur",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Demandeur
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
      const value = row.getValue<string>("demandeur") || "";
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
    accessorKey: "dateDebut",
    filterFn: dateBetween
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
    cell: ({ row }) => {
      return <div className="font-medium">{row.original.client.nomClient}</div>;
    }
  },
  {
    accessorKey: "etat",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Etat
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
        <div className="font-medium">
          {!row.getValue("etat") ? "EN_COURS" : "TERMINE"}
        </div>
      );
    }
  }
];
