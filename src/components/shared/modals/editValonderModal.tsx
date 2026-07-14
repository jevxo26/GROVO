"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import BaseModal from "./baseModal";
import FormInput from "../forms/formInput";
import FormSelect from "../forms/formSelect";
import ModalFooter from "./ModalFooter";

const volunteerSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  volunteerCode: z.string().min(1, "Volunteer code is required"),
  status: z.enum(["active", "pending"]),
  division: z.string().min(1, "Division is required"),
  district: z.string().min(1, "District is required"),
  upazila: z.string().optional(),
  membersRecruited: z.string().optional(),
  performanceScore: z.string().optional(),
  rank: z.enum(["Gold", "Silver", "Bronze"]).optional(),
});

type VolunteerFormValues = z.infer<typeof volunteerSchema>;

interface EditVolunteerModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: Partial<VolunteerFormValues> | null;
}

const EditVolunteerModal = ({
  isOpen,
  onClose,
  initialData,
}: EditVolunteerModalProps) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<VolunteerFormValues>({
    resolver: zodResolver(volunteerSchema),
    defaultValues: {
      fullName: "",
      volunteerCode: "",
      status: "active",
      division: "",
      district: "",
      upazila: "",
      membersRecruited: "0",
      performanceScore: "0",
      rank: "Bronze",
    },
  });

  useEffect(() => {
    if (initialData) {
      reset({
        ...initialData,
        status: initialData.status ?? "active",
        rank: initialData.rank ?? "Bronze",
      });
    }
  }, [initialData, reset]);

  const onSubmit = (data: VolunteerFormValues) => {
    console.log("Updated Volunteer:", data);
    onClose();
  };

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} title="Edit Volunteer">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <FormInput
          label="Full Name *"
          name="fullName"
          register={register}
          error={errors.fullName}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormInput
            label="Volunteer Code *"
            name="volunteerCode"
            register={register}
            error={errors.volunteerCode}
          />

          <FormSelect
            label="Status"
            name="status"
            control={control}
            options={[
              { value: "active", label: "Active" },
              { value: "pending", label: "Pending" },
            ]}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormSelect
            label="Division"
            name="division"
            control={control}
            options={[
              { value: "Dhaka", label: "Dhaka" },
              { value: "Chattogram", label: "Chattogram" },
              { value: "Rajshahi", label: "Rajshahi" },
              { value: "Khulna", label: "Khulna" },
              { value: "Barishal", label: "Barishal" },
              { value: "Sylhet", label: "Sylhet" },
              { value: "Rangpur", label: "Rangpur" },
              { value: "Mymensingh", label: "Mymensingh" },
            ]}
          />

          <FormSelect
            label="District *"
            name="district"
            control={control}
            options={[
              { value: "Dhaka", label: "Dhaka" },
              { value: "Gazipur", label: "Gazipur" },
              { value: "Narayanganj", label: "Narayanganj" },
              { value: "Manikganj", label: "Manikganj" },
              { value: "Tangail", label: "Tangail" },
              { value: "Faridpur", label: "Faridpur" },
              { value: "Chattogram", label: "Chattogram" },
              { value: "Cumilla", label: "Cumilla" },
              { value: "Noakhali", label: "Noakhali" },
              { value: "Cox's Bazar", label: "Cox's Bazar" },
              { value: "Rajshahi", label: "Rajshahi" },
              { value: "Khulna", label: "Khulna" },
              { value: "Sylhet", label: "Sylhet" },
            ]}
          />

          <FormInput
            label="Upazila"
            name="upazila"
            register={register}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormInput
            label="Members Recruited"
            name="membersRecruited"
            register={register}
          />

          <FormInput
            label="Performance Score"
            name="performanceScore"
            register={register}
          />

          <FormSelect
            label="Rank"
            name="rank"
            control={control}
            options={[
              { value: "Gold", label: "Gold" },
              { value: "Silver", label: "Silver" },
              { value: "Bronze", label: "Bronze" },
            ]}
          />
        </div>

        <ModalFooter
          onCancel={onClose}
          submitLabel="Save Changes"
        />
      </form>
    </BaseModal>
  );
};

export default EditVolunteerModal;