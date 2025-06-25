import { RequeteWithClient } from "@/types";
import { FilterFn } from "@tanstack/react-table";

export const dateBetween: FilterFn<RequeteWithClient> = (row, columnId, filterValue: [Date | undefined, Date | undefined]) => {
  const [start, end] = filterValue ?? [];
  const cellDate = new Date(row.getValue(columnId));

  if (start && cellDate < start) return false;
  if (end && cellDate > end) return false;

  return true;
};
