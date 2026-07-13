"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import BaseModal from "./baseModal";
import FormInput from "../forms/formInput";
import FormSelect from "../forms/formSelect";
import ModalFooter from "./ModalFooter";

const typeOptions = [{ value: "General Member", label: "General Member" }, { value: "Individual Donor", label: "Individual Donor" }, { value: "Corporate Donor", label: "Corporate Donor" }];
const districtOptions = [{ value: "Dhaka", label: "Dhaka" }, { value: "Chattogram", label: "Chattogram" }, { value: "Rajshahi", label: "Rajshahi" }, { value: "Barishal", label: "Barishal"}, { value: "Khulna", label: "Khulna" }, { value: "Sylhet", label: "Sylhet" }, { value: "Rangpur", label: "Rangpur" }, { value: "Mymensingh", label: "Mymensingh" }  ];
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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
interface EditMemberModalProps { isOpen: boolean; onClose: () => void; initialData?: Record<string, any> | null; }

const EditMemberModal = ({ isOpen, onClose, initialData }: EditMemberModalProps) => {
  const { register, handleSubmit, control, formState: { errors }, reset } = useForm<MemberFormValues>({
    resolver: zodResolver(memberSchema),
    defaultValues: initialData || { fullName: "Kamal Hossain", email: "kamal@email.com", phone: "+880 1712-345678", membershipNumber: "ASH-MEM-2024-0847", joinedDate: "2024-03-15", type: "General Member", district: "Dhaka", status: "active" },
  });

  useEffect(() => { if (initialData) reset(initialData); }, [initialData, reset]);

  const onSubmit = (data: MemberFormValues) => { console.log("Updated Data:", data); onClose(); };

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} title="Edit Member">
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

        <ModalFooter
          onCancel={onClose}
          submitLabel="Save Changes"
        />
      </form>
    </BaseModal>
  );
};

export default EditMemberModal;