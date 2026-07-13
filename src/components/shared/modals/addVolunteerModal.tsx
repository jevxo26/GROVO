"use client";

import React, { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import BaseModal from "./baseModal";
import FormInput from "../forms/formInput";
import FormSelect from "../forms/formSelect";

const divisionsData: Record<string, string[]> = {
  Dhaka: ["Dhaka", "Gazipur", "Narayanganj", "Tangail", "Faridpur", "Manikganj", "Munshiganj", "Narsingdi"],
  Chattogram: ["Chattogram", "Cox's Bazar", "Comilla", "Brahmanbaria", "Chandpur", "Noakhali", "Feni", "Lakshmipur"],
  Rajshahi: ["Rajshahi", "Bogura", "Pabna", "Natore", "Sirajganj", "Joypurhat", "Naogaon", "Chapainawabganj"],
  Khulna: ["Khulna", "Jashore", "Satkhira", "Kushtia", "Jhenaidah", "Magura", "Narail", "Chuadanga"],
  Barishal: ["Barishal", "Bhola", "Patuakhali", "Pirojpur", "Jhalokathi", "Barguna", "Mehendiganj", "Bakerganj"],
  Sylhet: ["Sylhet", "Moulvibazar", "Habiganj", "Sunamganj", "Chhatak", "Sreemangal", "Beanibazar", "Jagannathpur"],
  Rangpur: ["Rangpur", "Dinajpur", "Gaibandha", "Kurigram", "Lalmonirhat", "Nilphamari", "Panchagarh", "Thakurgaon"],
  Mymensingh: ["Mymensingh", "Jamalpur", "Netrokona", "Sherpur", "Trishal", "Muktagachha", "Bhaluka", "Gauripur"]
};

const volunteerSchema = z.object({
  fullName: z.string().min(1, "Full Name is required"),
  volunteerCode: z.string().min(1, "Code is required"),
  status: z.string().min(1, "Status is required"),
  division: z.string().min(1, "Division is required"),
  district: z.string().min(1, "District is required"),
  upazila: z.string().optional(),
  membersRecruited: z.string().optional(),
  performanceScore: z.string().optional(),
  rank: z.string().optional(),
});

type VolunteerFormValues = z.infer<typeof volunteerSchema>;

const AddVolunteerModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const { register, handleSubmit, control, formState: { errors }, reset, setValue } = useForm<VolunteerFormValues>({
    resolver: zodResolver(volunteerSchema),
    defaultValues: {
      volunteerCode: "VOL-DHA-0009",
      status: "Active",
      division: "Dhaka",
      district: "Dhaka",
    },
  });

  const selectedDivision = useWatch({ control, name: "division" });
  useEffect(() => {
    if (selectedDivision && divisionsData[selectedDivision]) {
      setValue("district", divisionsData[selectedDivision][0]);
    }
  }, [selectedDivision, setValue]);

  const onSubmit = (data: VolunteerFormValues) => {
    console.log("Submitted Data:", data);
    reset();
    onClose();
  };

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} title="Add Volunteer">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-[#3d2b22] dark:text-zinc-100">
        <FormInput label="Full Name *" name="fullName" register={register} error={errors.fullName} required />
        
        <div className="grid grid-cols-2 gap-4">
          <FormInput label="Volunteer Code *" name="volunteerCode" register={register} error={errors.volunteerCode} required />
          <FormSelect label="Status" name="status" control={control} options={[{value: "Active", label: "Active"}, {value: "Pending", label: "Pending"}]} />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <FormSelect label="Division" name="division" control={control} options={Object.keys(divisionsData).map(d => ({ value: d, label: d }))} />
          <FormSelect label="District *" name="district" control={control} options={(divisionsData[selectedDivision] || []).map(d => ({ value: d, label: d }))} />
          <FormInput label="Upazila" name="upazila" register={register} placeholder="e.g. Savar" />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <FormInput label="Members Recruited" name="membersRecruited" register={register} />
          <FormInput label="Performance Score" name="performanceScore" register={register} />
          <FormSelect label="Rank" name="rank" control={control} options={[{value: "New", label: "New"}, {value: "Bronze", label: "Bronze"}, {value: "Silver", label: "Silver"}, {value: "Gold", label: "Gold"}]} />
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t dark:border-zinc-800">
          <button type="button" onClick={onClose} className="px-6 py-2 border border-gray-200 dark:border-zinc-700 rounded-xl text-sm font-semibold hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors">
            Cancel
          </button>
          <button type="submit" className="px-6 py-2 bg-[#00a389] hover:bg-[#008f77] text-white text-sm font-semibold rounded-xl transition-colors">
            Add Volunteer
          </button>
        </div>
      </form>
    </BaseModal>
  );
};

export default AddVolunteerModal;