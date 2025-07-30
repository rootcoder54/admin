"use client";
import { Button } from "@/components/ui/button";
import { Table } from "@tanstack/react-table";
import { PlusIcon, X } from "lucide-react";
import { LiaFileInvoiceSolid } from "react-icons/lia";
import { AiFillFileAdd } from "react-icons/ai";

import { useEffect, useState } from "react";

import { DeleteRequete } from "../delete_requete";
import { RequeteWithClient } from "@/types";
import Link from "next/link";

import DetailRequet from "../detail_requete";
import SearchFilter from "./search-filter";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from "@/components/ui/tooltip";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  reload: () => void;
}

function DataToolBar<TData>({ table, reload }: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;
  const deselectRows = () => {
    table.getState().rowSelection = {};
    table.setRowSelection({});
  };
  const rowSelected = table.getState().rowSelection;
  const [id, setId] = useState("");

  const selectedRowsData = table
    .getRowModel()
    .rows.filter((row) => rowSelected[row.id]); // Récupérer les données des lignes sélectionnées
  useEffect(() => {
    selectedRowsData.forEach((row) => {
      const rowData = row.original as RequeteWithClient;
      setId(rowData.id);
      //setAdresse(rowData.adresse);
      //setActivite(rowData.activite);
      ///console.log("Nom de la ligne sélectionnée :", rowData.nom);
      //console.log("Activité de la ligne sélectionnée :", rowData.activite);
    });
  }, [selectedRowsData]);

  return (
    <div className="flex items-center py-4">
      <div className="flex flex-col items-center">
        {table.getFilteredSelectedRowModel().rows.length == 0 ? (
          <div className="flex items-center gap-3 py-2">
            <SearchFilter table={table} />
            <Input
              placeholder="Filter Sujet..."
              value={
                (table.getColumn("sujet")?.getFilterValue() as string) ?? ""
              }
              onChange={(event) =>
                table.getColumn("sujet")?.setFilterValue(event.target.value)
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
            <Link href={`/requete/add`}>
              <Button variant="outline" size={"sm"}>
                <PlusIcon />
                Ajouter
              </Button>
            </Link>
          </div>
        ) : (
          <div className="flex flex-row items-center justify-center gap-1 rounded-lg bg-zinc-300/30 px-4 py-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={"outline"}
                  size={"icon"}
                  className="size-8"
                  onClick={deselectRows}
                >
                  <X />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Déselectionné</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <DeleteRequete reload={reload} id={id} />
              </TooltipTrigger>
              <TooltipContent>
                <p>Supprimer</p>
              </TooltipContent>
            </Tooltip>
            <DetailRequet id={id} />
            <Link href={`/requete/intervention/${id}`}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button size={"sm"} className="size-8" variant={"blue"}>
                    <LiaFileInvoiceSolid />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Voir les interventions</p>
                </TooltipContent>
              </Tooltip>
            </Link>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button size={"sm"} className="size-8">
                  <AiFillFileAdd />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Ajouter une intervention</p>
              </TooltipContent>
            </Tooltip>
          </div>
        )}
      </div>

      {/*
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
       */}
    </div>
  );
}

export default DataToolBar;
