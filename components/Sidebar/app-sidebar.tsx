"use client";

import * as React from "react";
import {
  AlignLeft,
  AudioWaveform,
  Blocks,
  Calendar,
  Command,
  FileArchive,
  HelpCircle,
  Home,
  Inbox,
  MessageCircleQuestion,
  Search,
  Settings2,
  Sparkles,
  Sun,
  Trash2,
  User,
  Users
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail
} from "@/components/ui/sidebar";
import { MemoizedUserButton } from "@/components/Sidebar/userButton";
import { NavItems } from "./navItems";
import { usePathname } from "next/navigation";

// This is sample data.

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();

  const data = {
    navMain: [
      {
        title: "Accueil",
        url: "/",
        icon: Home,
        isActive: pathname === "/"
      },
      {
        title: "Employé",
        url: "/employe",
        icon: Users,
        badge: "10",
        isActive: pathname === "/employe"
      },
      {
        title: "Client",
        url: "/client",
        icon: Users,
        badge: "10",
        isActive: pathname.startsWith("/client")
      },
      {
        title: "Calendrier",
        url: "/calendrier",
        icon: Calendar,
        isActive: pathname === "/calendrier"
      },
      {
        title: "Tache",
        url: "/tache",
        icon: Calendar,
        isActive: pathname.startsWith("/tache")
      },
      {
        title: "Interventions",
        url: "#",
        icon: FileArchive,
        isActive: pathname === "/intervention"
      },
      {
        title: "Support Video",
        url: "/crmsupport",
        icon: HelpCircle,
        isActive: pathname === "/crmsupport"
      },
      {
        title: "Questions Frequents",
        url: "/ask",
        icon: MessageCircleQuestion,
        isActive: pathname === "/ask"
      },
      {
        title: "Settings",
        url: "#",
        icon: Settings2,
        isActive: pathname === "/settings"
      }
    ]
  };
  return (
    <Sidebar className="border-r-0" {...props}>
      <SidebarHeader>
        <MemoizedUserButton />
        <NavItems items={data.navMain} />
      </SidebarHeader>
      <SidebarRail />
    </Sidebar>
  );
}
