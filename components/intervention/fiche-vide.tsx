"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@/components/ui/popover";
import { ClientList } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { fetcher } from "@/lib/fetcher";
import Link from "next/link";

export function FicheVide() {
  const [open, setOpen] = React.useState(false);
  const { data: clientList } = useQuery<ClientList[]>({
    queryKey: ["clients"],
    queryFn: () => fetcher(`/api/client`)
  });

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="blue"
          role="combobox"
          aria-expanded={open}
          className="justify-between"
        >
          {"Fiche Intervention"}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search framework..." className="h-9" />
          <CommandList>
            <CommandEmpty>Pas de client.</CommandEmpty>
            <CommandGroup>
              {clientList?.map((client) => (
                <CommandItem
                  key={client.id}
                  value={client.nomClient}
                  className="p-0"
                >
                  <Link
                    href={`/imprime/fiche/${client.id}`}
                    target="_blank"
                    className="p-3 w-full"
                  >
                    {client.nomClient}
                  </Link>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
