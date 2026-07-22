import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  SidebarHeader,
  SidebarSeparator,
  SidebarFooter,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import { NavUser } from "./NavUser.tsx";
import { Separator } from "../ui/separator.tsx";

import { topItems, dropdownItems } from "../../../DevData/appSideBar.tsx";
import { useGetAllSettings } from "@/hooks/QueryHooks/Settings/useGetAllSettings.ts";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar.tsx";
import { Skeleton } from "../ui/skeleton.tsx";

export function AppSidebar() {
  const { data, isSettingsLoading } = useGetAllSettings();

  const settings = data?.settingsData[0];

  return (
    <Sidebar>
      <SidebarHeader className="items-center">
        {isSettingsLoading ? (
          <>
            <Skeleton className="h-10 w-10 rounded-full" />{" "}
            <Skeleton className="h-5 w-24" />
          </>
        ) : (
          <>
            <Avatar className="h-10 w-10">
              <AvatarImage src={settings?.logoImage} />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <h2 className="text-lg font-semibold">
              {settings?.buisnessName ?? "Food Engine"}
            </h2>
          </>
        )}
      </SidebarHeader>

      <Separator className="bg-sidebar-border" />

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {/* Top links — no dropdown */}
              {topItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link to={item.url}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}

              <SidebarSeparator className="my-2" />

              {/* Dropdown items */}
              {dropdownItems.map((item) => (
                <Collapsible key={item.title} className="group/collapsible">
                  <SidebarMenuItem>
                    <CollapsibleTrigger asChild>
                      <SidebarMenuButton>
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                        <ChevronDown className="ml-auto h-4 w-4 transition-transform group-data-[state=open]/collapsible:rotate-180" />
                      </SidebarMenuButton>
                    </CollapsibleTrigger>

                    <CollapsibleContent>
                      <SidebarMenuSub>
                        {item.children.map((child) => (
                          <SidebarMenuSubItem key={child.title}>
                            <SidebarMenuSubButton asChild>
                              <Link to={child.url}>{child.title}</Link>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsibleContent>
                  </SidebarMenuItem>
                </Collapsible>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser settings={settings} />
      </SidebarFooter>
    </Sidebar>
  );
}
