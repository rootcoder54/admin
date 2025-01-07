import { ThemeProvider } from "@/components/provider/theme-provider";
import { AppSidebar } from "@/components/Sidebar/app-sidebar";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { SessionProvider } from "next-auth/react";

export default function CRMLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <SessionProvider>
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset>
            <div className=" min-h-screen">{children}</div>
          </SidebarInset>
        </SidebarProvider>
      </SessionProvider>
    </ThemeProvider>
  );
}
