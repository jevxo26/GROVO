"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import BaseModal from "./baseModal";
import FormInput from "../forms/formInput";
import FormSelect from "../forms/formSelect";

const typeOptions = [{ value: "General Member", label: "General Member" }, { value: "Individual Donor", label: "Individual Donor" }, { value: "Corporate Donor", label: "Corporate Donor" }];
const districtOptions = [{ value: "Dhaka", label: "Dhaka" }, { value: "Chattogram", label: "Chattogram" }, { value: "Rajshahi", label: "Rajshahi" }, { value: "Barishal", label: "Barishal" },{ value: "Khulna", label: "Khulna" }, { value: "Sylhet", label: "Sylhet" }, { value: "Rangpur", label: "Rangpur" }, { value: "Mymensingh", label: "Mymensingh" }];
const statusOptions = [{ value: "active", label: "Active" }, { value: "pending", label: "Pending" }, { value: "suspended", label: "Suspended" }];

const memberSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email address").min(1, "Email is required"),
  phone: z.string().min(1, "Phone number is required"),
  membershipNumber: z.string().min(1, "Membership number is required"),
  joinedDate: z.string().min(1, "Joined date is required"),
  type: z.string().min(1, "Type is required"),
  district: z.string().min(1, "District is required"),
  status: z.string().min(1, "Status is required"),
});

type MemberFormValues = z.infer<typeof memberSchema>;

const AddMemberModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const { register, handleSubmit, control, formState: { errors }, reset } = useForm<MemberFormValues>({
    resolver: zodResolver(memberSchema),
    defaultValues: { membershipNumber: "ASH-MEM-2026-0009", joinedDate: "2026-07-11", type: "General Member", district: "Dhaka", status: "active" },
  });

  const onSubmit = (data: MemberFormValues) => { console.log(data); reset(); onClose(); };

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} title="Add Member">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-[#5c4033] dark:text-zinc-100 font-medium max-w-2xl mx-auto">
        <div>
          <FormInput label="Full Name" name="fullName" register={register} error={errors.fullName} placeholder="Enter full name" required />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormInput label="Email" name="email" type="email" register={register} error={errors.email} placeholder="Enter email address" required />
          <FormInput label="Phone" name="phone" register={register} error={errors.phone} placeholder="Enter phone number" required />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormInput label="Membership Number" name="membershipNumber" register={register} error={errors.membershipNumber} required />
          <FormInput label="Joined Date" name="joinedDate" type="date" register={register} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormSelect label="Type" name="type" control={control} options={typeOptions} />
          <FormSelect label="District" name="district" control={control} options={districtOptions} />
          <FormSelect label="Status" name="status" control={control} options={statusOptions} />
        </div>

        <div className="flex justify-end gap-3 pt-6 border-t dark:border-zinc-800">
          <button type="button" onClick={() => { reset(); onClose(); }} className="px-6 py-2.5 border border-[#e8dfd8] dark:border-zinc-700 rounded-xl text-sm font-semibold text-[#5c4033] dark:text-zinc-200 hover:bg-[#fbf7f4] dark:hover:bg-zinc-800 transition-colors">
            Cancel
          </button>
          <button type="submit" className="px-6 py-2.5 bg-[#00a389] hover:bg-[#008f77] text-white text-sm font-semibold rounded-xl transition-colors shadow-sm">
            Add Member
          </button>
        </div>
      </form>
    </BaseModal>
  );
};

export default AddMemberModal;