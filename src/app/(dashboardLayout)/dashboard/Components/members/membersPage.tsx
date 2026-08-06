"use client";

import { useState } from "react";
import { Users, UserCheck, Clock, ShieldAlert, Eye, Edit3, Trash2, CheckCircle2, XCircle } from "lucide-react";
import StatCard from "@/components/dashboard/shared/StatCard";
import DataTable, { Column } from "@/components/dashboard/shared/DataTable";
import { MemberModalForm } from "@/components/dashboard/members/MemberModalForm";
import { MemberActionModal } from "@/components/dashboard/members/MemberActionModal";
import {
  useGetAllMembershipsQuery,
  useCreateMembershipMutation,
  useUpdateMembershipMutation,
  useDeleteMembershipMutation,
} from "@/redux/slices/membershipSlice";

export default function MembersPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<any>(null);
  const [actionMode, setActionMode] = useState<"view" | "edit" | "delete" | "approve" | "reject" | null>(null);
  const [statusOverrides, setStatusOverrides] = useState<Record<string, string>>({});
  const [newlyAddedMembers, setNewlyAddedMembers] = useState<any[]>([]);

  // RTK Query hooks
  const { data: apiResponse, isLoading } = useGetAllMembershipsQuery();
  const [createMembership, { isLoading: isCreating }] = useCreateMembershipMutation();
  const [updateMembershipApi] = useUpdateMembershipMutation();
  const [deleteMembershipApi] = useDeleteMembershipMutation();

  const [localMembers, setLocalMembers] = useState([
    {
      id: "1",
      name: "Kamal Hossain",
      phone: "+880 1712-345678",
      email: "kamal@example.com",
      membership: "ASH-MEM-2024-0847",
      type: "General Member",
      district: "Dhaka",
      status: "active",
      joined: "2024-03-15",
    },
    {
      id: "2",
      name: "Fatima Rahman",
      phone: "+880 1812-456789",
      email: "fatima@example.com",
      membership: "ASH-MEM-2024-1156",
      type: "Individual Donor",
      district: "Chattogram",
      status: "active",
      joined: "2024-06-20",
    },
    {
      id: "3",
      name: "Rahim Industries Ltd.",
      phone: "+880 2555-7890",
      email: "info@rahimind.com",
      membership: "ASH-MEM-2024-0923",
      type: "Corporate Donor",
      district: "Dhaka",
      status: "active",
      joined: "2024-04-10",
    },
    {
      id: "4",
      name: "Dr. Imran Khan",
      phone: "+880 1612-567890",
      email: "imran@hospital.org",
      membership: "ASH-MEM-2025-0456",
      type: "Individual Donor",
      district: "Sylhet",
      status: "pending",
      joined: "2025-07-01",
    },
  ]);

  const rawData = apiResponse?.data || apiResponse;
  const baseMembersList = Array.isArray(rawData) && rawData.length > 0
    ? rawData.map((item: any, idx: number) => ({
        id: String(item.id || idx + 1),
        name: [item.user?.firstName, item.user?.lastName].filter(Boolean).join(" ") || item.name || "Member",
        phone: item.user?.phoneNumber || item.phone || "+880 1700000000",
        email: item.user?.email || item.email || "member@ashray.org",
        membership: item.membershipNumber || item.membership || `ASH-MEM-${item.id || idx}`,
        type: item.membershipType || "General Member",
        district: item.user?.presentAddress || "Dhaka",
        status: item.status?.toLowerCase() || "active",
        joined: item.createdAt ? new Date(item.createdAt).toISOString().split("T")[0] : "2024-01-01",
      }))
    : localMembers;

  const membersList = [...newlyAddedMembers, ...baseMembersList].map((m) => ({
    ...m,
    status: statusOverrides[String(m.id)] || m.status,
  }));

  const handleAction = (member: any, mode: "view" | "edit" | "delete" | "approve" | "reject") => {
    setSelectedMember(member);
    setActionMode(mode);
  };

  const handleDeleteMember = async (id: string | number) => {
    try {
      await deleteMembershipApi(id as any).unwrap();
    } catch (err) {
      setLocalMembers((prev) => prev.filter((m) => String(m.id) !== String(id)));
    }
  };

  const handleSaveMember = (updated: any) => {
    setLocalMembers((prev) =>
      prev.map((m) => (String(m.id) === String(updated.id) ? { ...m, ...updated } : m))
    );
  };

  const handleStatusChange = async (id: string | number, newStatus: string) => {
    setStatusOverrides((prev) => ({ ...prev, [String(id)]: newStatus }));
    try {
      await updateMembershipApi({ id: id as any, data: { status: newStatus.toUpperCase() } }).unwrap();
    } catch (err) {
      console.log("Updated member status locally:", id, newStatus);
    }
  };

  const columns: Column<(typeof membersList)[0]>[] = [
    {
      header: "Member Name",
      cell: (row) => (
        <div>
          <div className="font-bold text-foreground text-sm">{row.name}</div>
          <div className="text-xs text-muted-foreground">{row.phone}</div>
        </div>
      ),
    },
    {
      header: "Membership ID",
      accessorKey: "membership",
      cell: (row) => <span className="font-mono text-xs font-semibold text-primary">{row.membership}</span>,
    },
    { header: "Type", accessorKey: "type" },
    { header: "District", accessorKey: "district" },
    {
      header: "Status",
      cell: (row) => (
        <span
          className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
            row.status === "active"
              ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
              : row.status === "pending"
                ? "bg-amber-500/10 text-amber-600 dark:text-amber-400"
                : "bg-red-500/10 text-red-600 dark:text-red-400"
          }`}
        >
          {row.status}
        </span>
      ),
    },
    { header: "Joined Date", accessorKey: "joined" },
    {
      header: "Actions",
      cell: (row) => (
        <div className="flex items-center justify-end gap-1.5">
          {row.status === "pending" && (
            <>
              <button
                onClick={() => handleAction(row, "approve")}
                className="p-1.5 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 transition-colors"
                title="Approve Member"
              >
                <CheckCircle2 className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => handleAction(row, "reject")}
                className="p-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-500 transition-colors"
                title="Reject Member"
              >
                <XCircle className="w-3.5 h-3.5" />
              </button>
            </>
          )}
          <button
            onClick={() => handleAction(row, "view")}
            className="p-1.5 rounded-lg bg-muted hover:bg-primary/10 hover:text-primary text-muted-foreground transition-colors"
            title="View Profile Details"
          >
            <Eye className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => handleAction(row, "edit")}
            className="p-1.5 rounded-lg bg-muted hover:bg-primary/10 hover:text-primary text-muted-foreground transition-colors"
            title="Edit Member"
          >
            <Edit3 className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => handleAction(row, "delete")}
            className="p-1.5 rounded-lg bg-muted hover:bg-rose-500/10 hover:text-rose-500 text-muted-foreground transition-colors"
            title="Delete Member Account"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      ),
    },
  ];

  const handleCreateMember = async (formData: Record<string, any>) => {
    const newMemberObj = {
      id: String(Date.now()),
      name: [formData.firstName, formData.lastName].filter(Boolean).join(" ") || "New Member",
      phone: formData.phone || "+880 1700-000000",
      email: formData.email || "newmember@ashray.org",
      membership: `ASH-MEM-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      type: formData.membershipType || "General Member",
      district: formData.district || "Dhaka",
      status: "pending",
      joined: new Date().toISOString().split("T")[0],
    };

    setNewlyAddedMembers((prev) => [newMemberObj, ...prev]);

    try {
      await createMembership(formData).unwrap();
    } catch (err) {
      console.log("Created member locally:", newMemberObj);
    } finally {
      setIsModalOpen(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Total Members" value={membersList.length} change="+847 this month" icon={Users} />
        <StatCard title="Active Members" value={membersList.filter((m) => m.status === "active").length} change="Active rate" icon={UserCheck} />
        <StatCard title="Pending Approvals" value={membersList.filter((m) => m.status === "pending").length} change="Needs review" isPositive={false} icon={Clock} />
        <StatCard title="Suspended Accounts" value="0" change="System healthy" isPositive={true} icon={ShieldAlert} />
      </div>

      {/* Main Data Table */}
      <DataTable
        title="Foundation Members Registry"
        description="Search, manage and approve foundation member accounts nationwide"
        columns={columns}
        data={membersList}
        isLoading={isLoading}
        searchPlaceholder="Search by name, phone or membership ID..."
        searchField="name"
        onAddClick={() => setIsModalOpen(true)}
        addButtonLabel="Register Member"
      />

      {/* Schema-driven Member Onboarding Form */}
      <MemberModalForm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateMember}
        isLoading={isCreating}
      />

      {/* Member Action Modal (View / Edit / Approve / Reject / Delete) */}
      <MemberActionModal
        member={selectedMember}
        mode={actionMode}
        onClose={() => { setActionMode(null); setSelectedMember(null); }}
        onSave={handleSaveMember}
        onDelete={handleDeleteMember}
        onStatusChange={handleStatusChange}
      />
    </div>
  );
}