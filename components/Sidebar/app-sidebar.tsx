"use client";

import * as React from "react";
import {
  AlignLeft,
  AudioWaveform,
  Blocks,
  Calendar,
  Command,
  FileArchive,
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
import { UserButton } from "@/components/Sidebar/userButton";
import { NavItems } from "./navItems";

// This is sample data.
const data = {
  teams: [
    {
      name: "Acme Inc",
      logo: Command,
      plan: "Enterprise"
    },
    {
      name: "Acme Corp.",
      logo: AudioWaveform,
      plan: "Startup"
    },
    {
      name: "Evil Corp.",
      logo: Command,
      plan: "Free"
    }
  ],
  navMain: [
    {
      title: "Accueil",
      url: "#",
      icon: Home,
      isActive: true
    },
    {
      title: "Employé",
      url: "#",
      icon: Users,
      badge: "10"
    },
    {
      title: "Calendrier",
      url: "#",
      icon: Calendar
    },
    {
      title: "Interventions",
      url: "#",
      icon: FileArchive
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings2
    },
    {
      title: "Trash",
      url: "#",
      icon: Trash2
    },
    {
      title: "Help",
      url: "#",
      icon: MessageCircleQuestion
    }
  ]
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar className="border-r-0" {...props}>
      <SidebarHeader>
        <UserButton />
        <NavItems items={data.navMain} />
      </SidebarHeader>
      <SidebarRail />
    </Sidebar>
  );
}
