"use client"
import { ThemeProvider } from "@/components/provider/theme-provider";
import { AppSidebar } from "@/components/Sidebar/app-sidebar";

import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { SessionProvider } from "next-auth/react";
import NextNProgress from "nextjs-progressbar"


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
            <div className="min-h-screen">
                <NextNProgress color="#ca8a04" startPosition={0.3} stopDelayMs={200} height={3} showOnShallow={true} />
                {children}
            </div>
          </SidebarInset>
        </SidebarProvider>
      </SessionProvider>
    </ThemeProvider>
  );
}
