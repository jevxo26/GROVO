"use client";

import React, { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import BaseModal from "./baseModal";
import FormInput from "../forms/formInput";
import FormSelect from "../forms/formSelect";
import ModalFooter from "./ModalFooter";
import { divisionsData, divisionOptions, getDistrictOptions } from "@/data/locationData";

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
  const districtOptions = getDistrictOptions(selectedDivision);

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
          <FormSelect label="Division" name="division" control={control} options={divisionOptions} />
          <FormSelect label="District *" name="district" control={control} options={districtOptions} />
          <FormInput label="Upazila" name="upazila" register={register} placeholder="e.g. Savar" />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <FormInput label="Members Recruited" name="membersRecruited" register={register} />
          <FormInput label="Performance Score" name="performanceScore" register={register} />
          <FormSelect label="Rank" name="rank" control={control} options={[{value: "New", label: "New"}, {value: "Bronze", label: "Bronze"}, {value: "Silver", label: "Silver"}, {value: "Gold", label: "Gold"}]} />
        </div>

        <ModalFooter
          onCancel={onClose}
          onReset={reset}
          submitLabel="Add Volunteer"
        />
      </form>
    </BaseModal>
  );
};

export default AddVolunteerModal;