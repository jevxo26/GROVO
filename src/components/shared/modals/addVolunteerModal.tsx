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

const divisionOptions = Object.keys(divisionsData).map((div) => ({ value: div, label: div }));
const statusOptions = [{ value: "Active", label: "Active" }, { value: "Pending", label: "Pending" }];
const rankOptions = [{ value: "New", label: "New" }, { value: "Bronze", label: "Bronze" }, { value: "Silver", label: "Silver" }, { value: "Gold", label: "Gold" }];

const volunteerSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  volunteerCode: z.string().min(1, "Volunteer code is required"),
  status: z.string().min(1, "Status is required"),
  division: z.string().min(1, "Division is required"),
  district: z.string().min(1, "District is required"),
  upazila: z.string().optional(),
  membersRecruited: z.string().default("0"),
  performanceScore: z.string().default("0"),
  rank: z.string().min(1, "Rank is required"),
});

type VolunteerFormValues = z.infer<typeof volunteerSchema>;

const AddVolunteerModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const { register, handleSubmit, control, formState: { errors }, reset, setValue } = useForm<VolunteerFormValues>({
    resolver: zodResolver(volunteerSchema),
    defaultValues: { volunteerCode: "VOL-DHA-0009", status: "Active", division: "Dhaka", district: "Dhaka", membersRecruited: "0", performanceScore: "0", rank: "New" },
  });

  const selectedDivision = useWatch({ control, name: "division" });
  const districtOptions = selectedDivision && divisionsData[selectedDivision] ? divisionsData[selectedDivision].map((dist) => ({ value: dist, label: dist })) : [];

  useEffect(() => {
    if (selectedDivision) {
      const districts = divisionsData[selectedDivision] || [];
      if (districts.length > 0) setValue("district", districts[0]);
    }
  }, [selectedDivision, setValue]);

  const onSubmit = (data: VolunteerFormValues) => { console.log(data); reset(); onClose(); };

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} title="Add Volunteer">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-[#5c4033] dark:text-zinc-100 font-medium max-w-2xl mx-auto">
        <div>
          <FormInput label="Full Name" name="fullName" register={register} error={errors.fullName} placeholder="Enter full name" required />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormInput label="Volunteer Code" name="volunteerCode" register={register} error={errors.volunteerCode} required />
          <FormSelect label="Status" name="status" control={control} options={statusOptions} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormSelect label="Division" name="division" control={control} options={divisionOptions} />
          <FormSelect label="District" name="district" control={control} options={districtOptions} />
          <FormInput label="Upazila" name="upazila" register={register} placeholder="e.g. Savar" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormInput label="Members Recruited" name="membersRecruited" type="number" register={register} />
          <FormInput label="Performance Score" name="performanceScore" type="number" register={register} />
          <FormSelect label="Rank" name="rank" control={control} options={rankOptions} />
        </div>

        <div className="flex justify-end gap-3 pt-6 border-t dark:border-zinc-800">
          <button type="button" onClick={() => { reset(); onClose(); }} className="px-6 py-2.5 border border-[#e8dfd8] dark:border-zinc-700 rounded-xl text-sm font-semibold text-[#5c4033] dark:text-zinc-200 hover:bg-[#fbf7f4] dark:hover:bg-zinc-800 transition-colors">
            Cancel
          </button>
          <button type="submit" className="px-6 py-2.5 bg-[#00a389] hover:bg-[#008f77] text-white text-sm font-semibold rounded-xl transition-colors shadow-sm">
            Add Volunteer
          </button>
        </div>
      </form>
    </BaseModal>
  );
};

export default AddVolunteerModal;