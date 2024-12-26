import { AppSidebar } from "@/components/Sidebar/app-sidebar";

import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger
} from "@/components/ui/sidebar";
import { SessionProvider } from "next-auth/react";

export default function CRMLayout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <div className="dark:bg-zinc-800 bg-zinc-50 min-h-screen">{children}</div>
        </SidebarInset>
      </SidebarProvider>
    </SessionProvider>
  );
}
