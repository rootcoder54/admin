"use client";

import { Table } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { SlidersHorizontal } from "lucide-react";
import { CalendarDateRangePicker } from "./date-range-picker";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}
function SearchFilter<TData>({ table }: DataTableToolbarProps<TData>) {
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
              Sujet
            </Label>
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
          </div>

          <div className="flex items-center space-x-2">
            <Label className="w-36" htmlFor="search">
              Technicien
            </Label>
            <Input
              placeholder="Technicien"
              value={
                (table.getColumn("technicien")?.getFilterValue() as string) ??
                ""
              }
              onChange={(event) =>
                table
                  .getColumn("technicien")
                  ?.setFilterValue(event.target.value)
              }
              className="max-w-sm"
            />
          </div>

          <div className="flex items-center space-x-2">
            <Label className="w-36" htmlFor="search">
              Demandeur
            </Label>
            <Input
              placeholder="demandeur"
              value={
                (table.getColumn("demandeur")?.getFilterValue() as string) ?? ""
              }
              onChange={(event) =>
                table.getColumn("demandeur")?.setFilterValue(event.target.value)
              }
              className="max-w-sm"
            />
          </div>

          <div className="flex items-center space-x-2">
            <Label className="w-36" htmlFor="search">
              Logiciel
            </Label>
            <Select
              onValueChange={(event) => {
                console.log(event);
                table.getColumn("logiciel")?.setFilterValue(event);
              }}
              value={
                (table.getColumn("logiciel")?.getFilterValue() as string) ?? ""
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="select logiciel" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="RHPaie">RHPaie</SelectItem>
                  <SelectItem value="timesheet">TimeSheet</SelectItem>
                  <SelectItem value="rhfacture">RHFacture</SelectItem>
                  <SelectItem value="rhdata">RHData</SelectItem>
                  <SelectItem value="h">Tous</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center space-x-2">
            <Label className="w-36" htmlFor="">
              Date
            </Label>
            <CalendarDateRangePicker table={table} />
          </div>

          <PopoverClose asChild>
            <Button variant="blue">
              Filtrer
            </Button>
          </PopoverClose>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export default SearchFilter;
