import {
  Building2,
  Flag,
  HandCoins,
  HeartHandshake,
  LayoutDashboard,
  UserCheck,
  Users,
} from "lucide-react";

const sidebarLinks = [
  { name: "Overview", href: "/dashboard/admin", icon: LayoutDashboard },
  { name: "Members", href: "/dashboard/admin/members", icon: Users },
  { name: "Volunteers", href: "/dashboard/admin/volunteers", icon: UserCheck },
  { name: "Campaigns", href: "/dashboard/admin/campaigns", icon: Flag },
  { name: "Donations", href: "/dashboard/admin/donations", icon: HandCoins },
  {
    name: "Beneficiaries",
    href: "/dashboard/admin/beneficiaries",
    icon: HeartHandshake,
  },
  { name: "Branches", href: "/dashboard/admin/branches", icon: Building2 },
];
