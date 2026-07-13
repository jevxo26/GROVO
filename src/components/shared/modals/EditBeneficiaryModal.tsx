"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import BaseModal from "./baseModal";
import FormInput from "../forms/formInput";
import FormSelect from "../forms/formSelect";

const schema = z.object({
  fullName: z.string().min(1, "Required"),
  code: z.string().min(1, "Required"),
  phone: z.string().min(1, "Required"),
  date: z.string().min(1, "Required"),
  category: z.string().min(1, "Required"),
  status: z.string().min(1, "Required"),
  division: z.string().min(1, "Required"),
  district: z.string().min(1, "Required"),
  upazila: z.string().min(1, "Required"),
  union: z.string().min(1, "Required"),
  address: z.string().min(1, "Required"),
});

type FormValues = z.infer<typeof schema>;

interface Props {
  isOpen: boolean;
  onClose: () => void;
  defaultData: any;
  onSave: (data: FormValues) => void;
}

const EditBeneficiaryModal = ({ isOpen, onClose, defaultData, onSave }: Props) => {
  const { register, handleSubmit, control, reset } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      category: "Flood Victim",
      status: "Active",
      division: "Dhaka",
      district: "Dhaka",
    },
  });

  useEffect(() => {
    if (defaultData) {
      reset(defaultData);
    }
  }, [defaultData, reset]);

  const categories = [
    { value: "Flood Victim", label: "Flood Victim" },
    { value: "Orphan", label: "Orphan" },
    { value: "Medical Need", label: "Medical Need" },
    { value: "Education", label: "Education" },
    { value: "Food Security", label: "Food Security" },
    { value: "Winter Relief", label: "Winter Relief" },
    { value: "Emergency", label: "Emergency" },
    { value: "Other", label: "Other" },
  ];

  const statuses = [
    { value: "Active", label: "Active" },
    { value: "Assisted", label: "Assisted" },
    { value: "Pending", label: "Pending" },
  ];

  const divisions = [
    { value: "Dhaka", label: "Dhaka" },
    { value: "Chattogram", label: "Chattogram" },
    { value: "Sylhet", label: "Sylhet" },
    { value: "Rajshahi", label: "Rajshahi" },
    { value: "Khulna", label: "Khulna" },
    { value: "Barishal", label: "Barishal" },
    { value: "Rangpur", label: "Rangpur" },
    { value: "Mymensingh", label: "Mymensingh" },
  ];

  const districts = [
    { value: "Dhaka", label: "Dhaka" },
    { value: "Gazipur", label: "Gazipur" },
    { value: "Cumilla", label: "Cumilla" },
    { value: "Sylhet", label: "Sylhet" },
    { value: "Bogura", label: "Bogura" },
    { value: "Khulna", label: "Khulna" },
    { value: "Barishal", label: "Barishal" },
    { value: "Rangpur", label: "Rangpur" },
  ];

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} title="Edit Beneficiary">
      <form onSubmit={handleSubmit(onSave)} className="space-y-4">
        {/* Full Name */}
        <FormInput label="Full Name *" name="fullName" register={register} />

        {/* Row 1 */}
        <div className="grid grid-cols-3 gap-4">
          <FormInput label="Beneficiary Code *" name="code" register={register} />
          <FormInput label="Phone *" name="phone" register={register} />
          <FormInput label="Registered Date" name="date" type="date" register={register} />
        </div>

        {/* Row 2 */}
        <div className="grid grid-cols-3 gap-4">
          <FormSelect label="Category" name="category" control={control} options={categories} />
          <FormSelect label="Status" name="status" control={control} options={statuses} />
          <FormSelect label="Division" name="division" control={control} options={divisions} />
        </div>

        {/* Row 3 */}
        <div className="grid grid-cols-3 gap-4">
          <FormSelect label="District" name="district" control={control} options={districts} />
          <FormInput label="Upazila" name="upazila" register={register} />
          <FormInput label="Union" name="union" register={register} />
        </div>

        {/* Address */}
        <FormInput label="Address *" name="address" register={register} />

        {/* Buttons */}
        <div className="flex justify-end gap-3 mt-6">
          <button type="button" onClick={onClose} className="px-6 py-2 border rounded-xl hover:bg-gray-100">
            Cancel
          </button>
          <button type="submit" className="px-6 py-2 bg-[#00a389] text-white rounded-xl hover:bg-[#008f77]">
            Save Changes
          </button>
        </div>
      </form>
    </BaseModal>
  );
};

export default EditBeneficiaryModal;