"use client"
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { SidebarMenuButton } from "../ui/sidebar";
import { Search } from "lucide-react";
import { useState } from "react";

export const SearchButton = () => {
  const [search, setsearch] = useState("");

  const onchange = () => {};
  return (
    <Dialog>
      <DialogTrigger asChild>
        <SidebarMenuButton>
          <Search />
          Recherche
        </SidebarMenuButton>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[825px]">
        <div className="flex items-center border-b px-3">
          <DialogTitle />
          <Search className="mr-2 h-8 w-8 shrink-0 opacity-50" />
          <Input
            type="text"
            value={search}
            onChange={onchange}
            placeholder="recherche..."
            className="flex h-11 w-full rounded-md border-0 bg-transparent py-3 text-lg outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50"
          />
        </div>
        <div className="grid grid-cols-2 py-4">
        </div>
      </DialogContent>
    </Dialog>
  );
};
