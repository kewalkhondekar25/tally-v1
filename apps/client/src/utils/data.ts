import {
  LayoutDashboard,
  Search,
  Inbox,
  CircleFadingArrowUp,
  Settings,
  Globe,
  Trash2,
  LogOut,
  MoonStar,
} from "lucide-react";
import type React from "react";

interface NavLinkType {
  name: string;
  icon: React.ElementType;
}

const navLinks: NavLinkType[] = [
  {
    name: "dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "search",
    icon: Search,
  },
  {
    name: "inbox",
    icon: Inbox,
  },
  {
    name: "upgrade",
    icon: CircleFadingArrowUp,
  },
  {
    name: "domain",
    icon: Globe,
  },
  {
    name: "settings",
    icon: Settings,
  },
  {
    name: "trash",
    icon: Trash2,
  },
  {
    name: "Dark Mode",
    icon: MoonStar,
  },
  {
    name: "logout",
    icon: LogOut,
  },
];

export default navLinks;