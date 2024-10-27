import { env } from "@/lib/utils";
import {
  HomeIcon,
  BookOpenIcon,
  ListOrderedIcon,
  LayoutDashboardIcon,
  CodeXmlIcon,
} from "lucide-react";

export const NAVIGATION_DATA = {
  navbar: [{ href: "/", icon: HomeIcon, label: "Home" }],
  external: {
    Dashboard: {
      name: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboardIcon,
    },
    Gigs: {
      name: "Gigs",
      url: "/gigs",
      icon: ListOrderedIcon,
    },
    Documentation: {
      name: "Documentation",
      url: `${env.NEXT_PUBLIC_DOC_URL}`,
      icon: BookOpenIcon,
    },
    "Source Code": {
      name: "Source Code",
      url: `${env.NEXT_PUBLIC_CODE_URL}`,
      icon: CodeXmlIcon,
    },
  },
};
