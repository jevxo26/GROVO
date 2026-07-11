"use client";

import React, { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import BaseModal from "./baseModal";
import FormInput from "../forms/formInput";
import FormSelect from "../forms/formSelect";

const divisionsData: Record<string, string[]> = {
  Dhaka: ["Dhaka", "Gazipur", "Narayanganj", "Tangail", "Faridpur", "Manikganj", "Munshiganj", "Narsingdi", "Gopalganj", "Madaripur", "Rajbari", "Shariatpur", "Kishoreganj"],
  Chattogram: ["Chattogram", "Cox's Bazar", "Feni", "Comilla", "Brahmanbaria", "Rangamati", "Khagrachhari", "Bandarban", "Noakhali", "Lakshmipur", "Chandpur"],
  Rajshahi: ["Rajshahi", "Bogura", "Pabna", "Joypurhat", "Naogaon", "Natore", "Chapainawabganj", "Sirajganj"],
  Khulna: ["Khulna", "Jashore", "Bagerhat", "Satkhira", "Kushtia", "Chuadanga", "Meherpur", "Jhenaidah", "Magura", "Narail"],
  Barishal: ["Barishal", "Patuakhali", "Bhola", "Pirojpur", "Barguna", "Jhalokati"],
  Sylhet: ["Sylhet", "Moulvibazar", "Habiganj", "Sunamganj"],
  Rangpur: ["Rangpur", "Dinajpur", "Gaibandha", "Kurigram", "Lalmonirhat", "Nilphamari", "Panchagarh", "Thakurgaon"],
  Mymensingh: ["Mymensingh", "Jamalpur", "Netrokona", "Sherpur"]
};

const divisionOptions = Object.keys(divisionsData).map((div) => ({
  value: div,
  label: div,
}));

// Branch Type Options
const branchTypeOptions = [
  { value: "District", label: "District" },
  { value: "Head Office", label: "Head Office" },
  { value: "Division", label: "Division" },
  { value: "Upazila", label: "Upazila" },
  { value: "Union", label: "Union" },
];

// Status Options
const statusOptions = [
  { value: "Active", label: "Active" },
  { value: "Pending", label: "Pending" }, // ফিক্সড টাইপো (panding -> Pending)
];

const branchSchema = z.object({
  branchName: z.string().min(1, "Branch name is required"),
  branchCode: z.string().min(1, "Branch code is required"),
  branchType: z.string().min(1, "Branch type is required"),
  status: z.string().min(1, "Status is required"),
  division: z.string().min(1, "Division is required"),
  district: z.string().min(1, "District is required"),
  upazila: z.string().optional(),
  union: z.string().optional(),
  address: z.string().min(1, "Address is required"),
  establishedDate: z.string().min(1, "Established date is required"),
});

type BranchFormValues = z.infer<typeof branchSchema>;

const AddBranchModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const { register, handleSubmit, control, formState: { errors }, reset, setValue } = useForm<BranchFormValues>({
    resolver: zodResolver(branchSchema),
    defaultValues: {
      branchCode: "BR-DHA-009", 
      branchType: "District", 
      status: "Active",
      division: "Dhaka", 
      district: "Dhaka", 
      establishedDate: "2026-07-11",
    },
  });

  const selectedDivision = useWatch({
    control,
    name: "division",
  });

  const districtOptions = selectedDivision && divisionsData[selectedDivision]
    ? divisionsData[selectedDivision].map((dist) => ({
        value: dist,
        label: dist,
      }))
    : [];

  useEffect(() => {
    if (selectedDivision) {
      const districts = divisionsData[selectedDivision] || [];
      if (districts.length > 0) {
        setValue("district", districts[0]);
      }
    }
  }, [selectedDivision, setValue]);

  const onSubmit = (data: BranchFormValues) => { 
    console.log(data); 
    reset(); 
    onClose(); 
  };

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} title="Add Branch">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-[#3d2b22] dark:text-zinc-100">
        <FormInput label="Branch Name" name="branchName" register={register} error={errors.branchName} required placeholder="e.g. ASHRAY Chattogram Division" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormInput label="Branch Code" name="branchCode" register={register} error={errors.branchCode} required />
          <FormSelect label="Branch Type" name="branchType" control={control} options={branchTypeOptions} />
          <FormSelect label="Status" name="status" control={control} options={statusOptions} />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <FormSelect label="Division" name="division" control={control} options={divisionOptions} />
          <FormSelect label="District" name="district" control={control} options={districtOptions} />
          <FormInput label="Upazila" name="upazila" register={register} placeholder="e.g. Savar" />
          <FormInput label="Union" name="union" register={register} placeholder="e.g. Tetuljhora" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormInput label="Address" name="address" register={register} error={errors.address} required placeholder="Full street address..." />
          <FormInput label="Established Date" name="establishedDate" type="date" register={register} />
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t dark:border-zinc-800">
          <button type="button" onClick={() => { reset(); onClose(); }} className="px-6 py-2 border border-gray-200 dark:border-zinc-700 rounded-xl text-sm font-medium hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors">
            Cancel
          </button>
          <button type="submit" className="px-6 py-2 bg-[#00a389] hover:bg-[#008f77] dark:bg-[#00c4a5] dark:hover:bg-[#00a389] text-white text-sm font-semibold rounded-xl transition-colors">
            Add Branch
          </button>
        </div>
      </form>
    </BaseModal>
  );
};

export default AddBranchModal;


