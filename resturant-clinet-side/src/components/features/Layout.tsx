import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSdeBar";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarTrigger />
      <main className="flex-1">
        <Outlet />
      </main>
    </SidebarProvider>
  );
}
