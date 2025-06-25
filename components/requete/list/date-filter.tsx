import { RequeteWithClient } from "@/types";
import {  FilterFn } from "@tanstack/react-table";

export const dateBetween: FilterFn<RequeteWithClient> = (row, columnId, value) => {
  const [start, end] = value ?? [];
  const cellDate = new Date(row.getValue(columnId));

  if (start && cellDate < new Date(start)) return false;
  if (end && cellDate > new Date(end)) return false;
  return true;
};