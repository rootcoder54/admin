"use client";

import { AlignLeft, type LucideIcon } from "lucide-react";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from "@/components/ui/sidebar";
import { Mode } from "../provider/mode";
import Link from "next/link";
import { SearchButton } from "./searchButton";
import { ScrollArea } from "../ui/scroll-area";

export function NavItems({
  items
}: {
  items: {
    title: string;
    url: string;
    icon: LucideIcon;
    isActive?: boolean;
  }[];
}) {
  return (
    <ScrollArea  className="h-full w-full">
      <SidebarMenu className="gap-y-1">
        <SidebarMenuItem>
          <Mode />
        </SidebarMenuItem>
        <SidebarMenuItem>
          <SearchButton />
        </SidebarMenuItem>
        <SidebarMenuItem>
          <SidebarMenuButton>
            <AlignLeft />
            <span>Nouvelle requête</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
        <hr />
        {items.map((item) => (
          <SidebarMenuItem key={item.title}>
            <SidebarMenuButton asChild isActive={item.isActive}>
              <Link href={item.url}>
                <item.icon />
                <span>{item.title}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </ScrollArea>
  );
}
