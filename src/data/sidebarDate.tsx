import {
  Building2,
  Flag,
  HandCoins,
  HeartHandshake,
  LayoutDashboard,
  UserCheck,
  Users,
} from "lucide-react";

export const sidebarLinks = [
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

// export const sidebarNavigation = {
//   member: [
//     { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
//     { name: "My Profile", href: "/dashboard/profile", icon: Users },
//     { name: "My Donations", href: "/dashboard/donations", icon: HandCoins },
//     { name: "My Campaigns", href: "/dashboard/campaigns", icon: Flag },
//     { name: "Certificates", href: "/dashboard/certificates", icon: Award },
//   ],
//   corporate: [
//     { name: "Overview", href: "/dashboard", icon: LayoutGrid },
//     { name: "Donations", href: "/dashboard/donations", icon: HandCoins },
//     { name: "Projects", href: "/dashboard/projects", icon: Folder },
//     { name: "CSR Reports", href: "/dashboard/reports", icon: BarChart3 },
//   ],
//   executivemember: [
//     { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
//     { name: "My Profile", href: "/dashboard/profile", icon: Users },
//     { name: "My Donations", href: "/dashboard/donations", icon: HandCoins },
//     { name: "My Campaigns", href: "/dashboard/campaigns", icon: Flag },
//     { name: "Certificates", href: "/dashboard/certificates", icon: Award },
//   ],
//   volunteer: [
//     { name: "Overview", href: "/dashboard", icon: LayoutGrid },
//     {
//       name: "Register Members",
//       href: "/dashboard/registermember",
//       icon: UserPlus,
//     },
//     { name: "My Activities", href: "/dashboard/activities", icon: SquareCheck },
//     { name: "Performance", href: "/dashboard/performance", icon: BarChart3 },
//   ],
//   staf: [
//     { name: "Overview", href: "/dashboard", icon: LayoutGrid },
//     { name: "My Tasks", href: "/dashboard/mytask", icon: SquareCheck },
//     { name: "Branch Info", href: "/dashboard/branchinfo", icon: Building2 },
//   ],
//   individualdonor: [
//     { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
//     { name: "My Profile", href: "/dashboard/profile", icon: Users },
//     { name: "My Wallet", href: "/dashboard/wallet", icon: Wallet },
//     { name: "My Donations", href: "/dashboard/donations", icon: HandCoins },
//     { name: "Campaigns", href: "/dashboard/campaigns", icon: Flag },
//     { name: "My Impact", href: "/dashboard/impact", icon: HeartPulse },
//     { name: "Certificates", href: "/dashboard/certificates", icon: Award },
//     { name: "Referals", href: "/dashboard/referal", icon: CornerUpRight },
//   ],
//   admin: [
//     { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
//     { name: "Members", href: "/dashboard/members", icon: Users },
//     {
//       name: "Volunteers",
//       href: "/dashboard/volunteers",
//       icon: UserCheck,
//     },
//     { name: "Campaigns", href: "/dashboard/campaigns", icon: Flag },
//     { name: "Donations", href: "/dashboard/donations", icon: HandCoins },
//     {
//       name: "Beneficiaries",
//       href: "/dashboard/beneficiaries",
//       icon: HeartHandshake,
//     },
//     { name: "Branches", href: "/dashboard/branches", icon: Building2 },
//     { name: "Finance", href: "/dashboard/finance", icon: PieChart },
//     { name: "Analytics", href: "/dashboard/analytics", icon: BarChart3 },
//     { name: "Events", href: "/dashboard/events", icon: CalendarDays },
//     { name: "Gallery", href: "/dashboard/gallery", icon: ImageIcon },
//     {
//       name: "Notifications",
//       href: "/dashboard/notifications",
//       icon: Bell,
//     },
//   ],

//   nationaladmin: [
//     {
//       name: "Overview",
//       href: "/dashboard",
//       icon: LayoutDashboard,
//     },
//     { name: "Members", href: "/dashboard/members", icon: Users },
//     {
//       name: "Volunteers",
//       href: "/dashboard/volunteers",
//       icon: UserCheck,
//     },
//     {
//       name: "Campaigns",
//       href: "/dashboard/campaigns",
//       icon: Flag,
//     },
//     {
//       name: "Donations",
//       href: "/dashboard/donations",
//       icon: HandCoins,
//     },
//     {
//       name: "Beneficiaries",
//       href: "/dashboard/beneficiaries",
//       icon: HeartHandshake,
//     },
//     {
//       name: "Branches",
//       href: "/dashboard/branches",
//       icon: Building2,
//     },
//     {
//       name: "Finance",
//       href: "/dashboard/finance",
//       icon: PieChart,
//     },
//     {
//       name: "Analytics",
//       href: "/dashboard/analytics",
//       icon: BarChart3,
//     },
//     {
//       name: "Events",
//       href: "/dashboard/events",
//       icon: CalendarDays,
//     },
//     {
//       name: "Gallery",
//       href: "/dashboard/gallery",
//       icon: ImageIcon,
//     },
//     {
//       name: "Notifications",
//       href: "/dashboard/notifications",
//       icon: Bell,
//     },
//   ],
//   divisioncoordinator: [
//     {
//       name: "Overview",
//       href: "/dashboard",
//       icon: LayoutDashboard,
//     },
//     {
//       name: "Members",
//       href: "/dashboard/members",
//       icon: Users,
//     },
//     {
//       name: "Volunteers",
//       href: "/dashboard/volunteers",
//       icon: UserCheck,
//     },
//     {
//       name: "Donors",
//       href: "/dashboard/donors",
//       icon: HandCoins,
//     },
//     {
//       name: "Campaigns",
//       href: "/dashboard/campaigns",
//       icon: Flag,
//     },
//     {
//       name: "Projects",
//       href: "/dashboard/projects",
//       icon: Folder,
//     },
//     {
//       name: "Beneficiaries",
//       href: "/dashboard/beneficiaries",
//       icon: UserCheck,
//     },
//     {
//       name: "Distribution",
//       href: "/dashboard/distribution",
//       icon: Truck,
//     },
//     {
//       name: "Field Activities",
//       href: "/dashboard/fieldActivities",
//       icon: MapPin,
//     },
//     {
//       name: "Analytics",
//       href: "/dashboard/analytics",
//       icon: BarChart3,
//     },
//     {
//       name: "Branch Settings",
//       href: "/dashboard/settings",
//       icon: Settings,
//     },
//     {
//       name: "Announcements",
//       href: "/dashboard/announcements",
//       icon: Megaphone,
//     },
//   ],
//   districtcoordinator: [
//     {
//       name: "Overview",
//       href: "/dashboard",
//       icon: LayoutDashboard,
//     },
//     {
//       name: "Members",
//       href: "/dashboard/members",
//       icon: Users,
//     },
//     {
//       name: "Volunteers",
//       href: "/dashboard/volunteers",
//       icon: UserCheck,
//     },
//     {
//       name: "Donors",
//       href: "/dashboard/donors",
//       icon: HandCoins,
//     },
//     {
//       name: "Campaigns",
//       href: "/dashboard/campaigns",
//       icon: Flag,
//     },
//     {
//       name: "Projects",
//       href: "/dashboard/projects",
//       icon: Folder,
//     },
//     {
//       name: "Beneficiaries",
//       href: "/dashboard/beneficiaries",
//       icon: UserCheck,
//     },
//     {
//       name: "Distribution",
//       href: "/dashboard/distribution",
//       icon: Truck,
//     },
//     {
//       name: "Field Activities",
//       href: "/dashboard/fieldActivities",
//       icon: MapPin,
//     },
//     {
//       name: "Analytics",
//       href: "/dashboard/analytics",
//       icon: BarChart3,
//     },
//     {
//       name: "Branch Settings",
//       href: "/dashboard/settings",
//       icon: Settings,
//     },
//     {
//       name: "Announcements",
//       href: "/dashboard/announcements",
//       icon: Megaphone,
//     },
//   ],
//   upazilacoordinator: [
//     {
//       name: "Overview",
//       href: "/dashboard",
//       icon: LayoutDashboard,
//     },
//     {
//       name: "Members",
//       href: "/dashboard/members",
//       icon: Users,
//     },
//     {
//       name: "Volunteers",
//       href: "/dashboard/volunteers",
//       icon: UserCheck,
//     },
//     {
//       name: "Donors",
//       href: "/dashboard/donors",
//       icon: HandCoins,
//     },
//     {
//       name: "Campaigns",
//       href: "/dashboard/campaigns",
//       icon: Flag,
//     },
//     {
//       name: "Projects",
//       href: "/dashboard/projects",
//       icon: Folder,
//     },
//     {
//       name: "Beneficiaries",
//       href: "/dashboard/beneficiaries",
//       icon: UserCheck,
//     },
//     {
//       name: "Distribution",
//       href: "/dashboard/distribution",
//       icon: Truck,
//     },
//     {
//       name: "Field Activities",
//       href: "/dashboard/fieldActivities",
//       icon: MapPin,
//     },
//     {
//       name: "Analytics",
//       href: "/dashboard/analytics",
//       icon: BarChart3,
//     },
//     {
//       name: "Branch Settings",
//       href: "/dashboard/settings",
//       icon: Settings,
//     },
//     {
//       name: "Announcements",
//       href: "/dashboard/announcements",
//       icon: Megaphone,
//     },
//   ],
//   unioncoordinator: [
//     {
//       name: "Overview",
//       href: "/dashboard",
//       icon: LayoutDashboard,
//     },
//     {
//       name: "Members",
//       href: "/dashboard/members",
//       icon: Users,
//     },
//     {
//       name: "Volunteers",
//       href: "/dashboard/volunteers",
//       icon: UserCheck,
//     },
//     {
//       name: "Donors",
//       href: "/dashboard/donors",
//       icon: HandCoins,
//     },
//     {
//       name: "Campaigns",
//       href: "/dashboard/campaigns",
//       icon: Flag,
//     },
//     {
//       name: "Projects",
//       href: "/dashboard/projects",
//       icon: Folder,
//     },
//     {
//       name: "Beneficiaries",
//       href: "/dashboard/beneficiaries",
//       icon: UserCheck,
//     },
//     {
//       name: "Distribution",
//       href: "/dashboard/distribution",
//       icon: Truck,
//     },
//     {
//       name: "Field Activities",
//       href: "/dashboard/fieldActivities",
//       icon: MapPin,
//     },
//     {
//       name: "Analytics",
//       href: "/dashboard/analytics",
//       icon: BarChart3,
//     },
//     {
//       name: "Branch Settings",
//       href: "/dashboard/settings",
//       icon: Settings,
//     },
//     {
//       name: "Announcements",
//       href: "/dashboard/announcements",
//       icon: Megaphone,
//     },
//   ],
// };
