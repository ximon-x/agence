/* eslint-disable react/jsx-key */
import {
  Home,
  Inbox,
  Search,
  Settings,
  BriefcaseBusiness,
  Vote,
  HandCoins,
} from "lucide-react";
import Link from "next/link";

import AgenceLogo from "../icons/agence-logo";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";

const items = [
  {
    title: "Home",
    url: "#",
    icon: Home,
  },
  {
    title: "Inbox",
    url: "#",
    icon: Inbox,
    items: [
      {
        title: "Unread",
        url: "/messages/unread",
      },
      {
        title: "All",
        url: "/messages/all",
      },
    ],
  },
  {
    title: "Search",
    url: "#",
    icon: Search,
  },
  {
    title: "Gigs",
    url: "/gigs",
    icon: BriefcaseBusiness,
    items: [
      {
        title: "Active Gigs",
        url: "/gigs/active",
        icon: BriefcaseBusiness,
      },
    ],
  },
  {
    title: "Staking",
    url: "#",
    icon: HandCoins,
    items: [
      {
        title: "Active Stakes",
        url: "/gigs/active",
      },
    ],
  },
  {
    title: "Governance",
    url: "#",
    icon: Vote,
    items: [
      {
        title: "Active Governance",
        url: "/gigs/active",
      },
    ],
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="py-8">
        <Link href="/" className="flex w-full items-center justify-start">
          <AgenceLogo size={200} axis="width" />
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              {/* {items.map((item) => {
                if (item.items) {
                  return (
                    <Collapsible defaultOpen className="group/collapsible">
                      <SidebarMenuItem>
                        <CollapsibleTrigger asChild>
                          <SidebarMenuButton
                            asChild
                            className="flex items-center justify-between"
                          >
                            <div>
                              <div className="flex items-center space-x-2">
                                {item.icon}
                                <span>{item.title}</span>
                              </div>

                              <ChevronsUpDown />
                            </div>
                          </SidebarMenuButton>
                        </CollapsibleTrigger>

                        <CollapsibleContent>
                          <SidebarMenuSub>
                            {item.items.map((subItem) => (
                              <SidebarMenuSubItem key={subItem.title}>
                                <a href={subItem.url}>{subItem.title}</a>
                              </SidebarMenuSubItem>
                            ))}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      </SidebarMenuItem>
                    </Collapsible>
                  );
                }

                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <a href={item.url}>
                        {item.icon}
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })} */}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
