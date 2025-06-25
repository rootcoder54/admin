"use client";
import { Button } from "@/components/ui/button";
import { Table } from "@tanstack/react-table";
import { FileArchive, PlusIcon, X } from "lucide-react";

import { useEffect, useState } from "react";

import { DeleteRequete } from "../delete_requete";
import { RequeteWithClient } from "@/types";
import Link from "next/link";

import DetailRequet from "../detail_requete";
import SearchFilter from "./search-filter";
import { Input } from "@/components/ui/input";

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
    <div className="flex items-center gap-3 py-4">
      <div className="flex md:flex-row flex-col gap-3">
        <div className="flex items-center gap-3">
          <SearchFilter table={table} />

          <Input
            placeholder="Filter Sujet..."
            value={(table.getColumn("sujet")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("sujet")?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />

          {/* table.getColumn("etat") && (
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="border-dashed border-2">
                  Etat :
                  <Badge>
                    {encour && !fin && "EN COURS"}
                    {!encour && fin && "TERMINE"}
                    {!encour && !fin && "TOUS"}
                  </Badge>
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[200px] p-0" align="start">
                <div className="flex flex-col space-y-1 p-1">
                  <Button
                    className="w-full justify-start h-8"
                    variant={fin ? "secondary" : "ghost"}
                    onClick={() => {
                      setEncour(false);
                      setFin(true);
                      table.getColumn("etat")?.setFilterValue(true);
                    }}
                  >
                    <CheckCircle /> TERMINE
                  </Button>
                  <Button
                    className="w-full justify-start h-8"
                    variant={encour ? "secondary" : "ghost"}
                    onClick={() => {
                      setEncour(true);
                      setFin(false);
                      table.getColumn("etat")?.setFilterValue(false);
                    }}
                  >
                    <Gamepad /> EN COURS
                  </Button>
                  <Button
                    className="w-full justify-start h-8"
                    variant={!fin && !encour ? "secondary" : "ghost"}
                    onClick={() => {
                      setEncour(false);
                      setFin(false);
                      table.resetColumnFilters();
                    }}
                  >
                    <CheckCheckIcon />
                    TOUS
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          )*/}
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
        <div className="flex flex-row items-center justify-end gap-3">
          {table.getFilteredSelectedRowModel().rows.length !== 0 && (
            <>
              <DeleteRequete reload={reload} id={id} />
              {/*<Link href={`/requete/${id}`}>
                <Button variant="gray" size={"sm"}>
                  <FileStack />
                </Button>
              </Link>
              */}
              <DetailRequet id={id} />
              <Link href={`/requete/intervention/${id}`}>
                <Button size={"sm"} variant={"blue"}>
                  <FileArchive />
                  Intervention
                </Button>
              </Link>
              <Button variant={"gray"} size={"sm"} onClick={deselectRows}>
                Deselectionné
              </Button>
            </>
          )}
        </div>
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
