import { env } from "@/lib/utils";
import {
  HomeIcon,
  BookOpenIcon,
  CodeXmlIcon,
  Inbox,
  BriefcaseBusiness,
  Vote,
  Settings,
} from "lucide-react";

export const NAVIGATION_DATA = {
  navbar: [
    { href: "/dashboard", icon: HomeIcon, label: "Home" },
    { href: "/inbox", icon: Inbox, label: "Inbox" },
    { href: "/gigs", icon: BriefcaseBusiness, label: "Gigs" },
    { href: "proposals", icon: Vote, label: "Proposals" },
    { href: "/settings", icon: Settings, label: "Settings" },
  ],
  external: {
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
