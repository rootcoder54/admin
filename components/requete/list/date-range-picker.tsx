"use client";

import * as React from "react";
import { addDays, format } from "date-fns";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";

import { Table } from "@tanstack/react-table";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function CalendarDateRangePicker<TData>({
  table
}: DataTableToolbarProps<TData>) {
  const filterValue = table.getColumn("dateDebut")?.getFilterValue() as
    | [Date | undefined, Date | undefined]
    | undefined;

  const from = filterValue?.[0];
  const to = filterValue?.[1];

  const [dateFilter, setDateFilter] = React.useState<
    [Date | undefined, Date | undefined]
  >([from, to]);

  const [date, setDate] = React.useState<DateRange | undefined>({
    from: from,
    to: to ? addDays(to, -1) : undefined
  });

  const handleDateChange = (newDate: DateRange | undefined) => {
    setDate(newDate);
    if (!newDate) {
      setDateFilter([undefined, undefined]);
    } else {
      if (newDate.from == newDate.to) {
        setDateFilter([newDate.from, newDate.to]);
      } else {
        setDateFilter([
          newDate.from,
          newDate.to ? addDays(newDate.to, 1) : undefined
        ]);
      }
    }
  };

  // Appliquer le filtre à la table quand `dateFilter` change
  React.useEffect(() => {
    if (dateFilter[0] !== undefined || dateFilter[1] !== undefined) {
      table.getColumn("dateDebut")?.setFilterValue(dateFilter);
    }
  }, [dateFilter, table]);

  return (
    <div className={cn("grid gap-2 w-full")}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal hover:dark:bg-stone-900",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {from ? (
              to ? (
                <>
                  {format(from, "LLL dd, y")} -{" "}
                  {format(addDays(to, -1), "LLL dd, y")}
                </>
              ) : (
                format(from, "LLL dd, y")
              )
            ) : (
              <span>Choisis la date</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="end">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={handleDateChange}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
