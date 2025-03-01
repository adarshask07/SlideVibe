'use client'
import { Sidebar, SidebarMenuButton } from "@/components/ui/sidebar";
import { Project, User } from "@prisma/client";
import React from "react";
import {
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import NavMain from "@/components/global/app-sidebar/nav-main";
import { data } from "@/lib/constants";
import RecentOpen from "./recent-open";
import NavFooter from "./nav-footer";

const AppSideBar = ({
  recentProjects,
  user,
  ...props
}: {
  recentProjects: Project[];
} & {
  user: User;
} & React.ComponentProps<typeof Sidebar>) => {
  return (
    
    <Sidebar
      collapsible="icon"
      {...props}
      className="max-w-[212px] bg-background-90"
    >
{/* Sidebar header ----------------------------*/}
      <SidebarHeader className="pt-6 px-2 pb-0">
        <SidebarMenuButton
          size={"lg"}
          className="data-[state=open] :text-sidebar-accent-foreground"
        >
          <div
            className="flex aspect-square size-8 items-center
          justify-center rounded-lg text-sidebar-primary-foreground"
          >
            <Avatar className=" h-12 w-12 rounded-full">
              <AvatarImage src={"/slideai.png"} alt={"vivid-logo"} />
              <AvatarFallback className="rounded-lg">SV</AvatarFallback>
            </Avatar>
          </div>
          <span className="truncate text-primary text-2xl font-semibold">
            {" "}
            SLIDEVIBE
          </span>
        </SidebarMenuButton>
      </SidebarHeader>

{/* Main sidebar content------------------------- */}
      <SidebarContent className="px-2 mt-10 gap-y-6">
        <NavMain items={data.navMain}/>
        <RecentOpen recentProjects={recentProjects}/>
      </SidebarContent>

{/* Footer sidebar content --------------------- */}
      <SidebarFooter>
       <NavFooter prismaUser={user}/>
      </SidebarFooter>

    </Sidebar>
  );
};

export default AppSideBar;
