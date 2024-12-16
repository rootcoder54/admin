"use client";

import { AlignLeft, Search, Sun, type LucideIcon } from "lucide-react";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from "@/components/ui/sidebar";
import { Mode } from "../provider/mode";

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
    <SidebarMenu className="gap-y-1">
      <SidebarMenuItem>
        <Mode />
      </SidebarMenuItem>
      <SidebarMenuItem>
        <SidebarMenuButton>
          <Search />
          <span>Seark</span>
        </SidebarMenuButton>
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
            <a href={item.url}>
              <item.icon />
              <span>{item.title}</span>
            </a>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );
}
