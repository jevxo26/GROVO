"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import BaseModal from "./baseModal";
import FormInput from "../forms/formInput";
import FormSelect from "../forms/formSelect";
import ModalFooter from "./ModalFooter";

const createCampaignSchema = z.object({
  title: z.string().min(1, "Required"),
  campaignCode: z.string().min(1, "Required"),
  category: z.string().min(1, "Required"),
  campaignType: z.string().min(1, "Required"),
  status: z.string().min(1, "Required"),
  shortDescription: z.string().optional(),
  fullDescription: z.string().optional(),
  targetAmount: z.string().min(1, "Required"),
  raisedAmount: z.string().optional(),
  donorsCount: z.string().optional(),
  startDate: z.string().min(1, "Required"),
  endDate: z.string().min(1, "Required"),
  thumbnailUrl: z.string().optional(),
  bannerUrl: z.string().optional(),
});

type FormValues = z.infer<typeof createCampaignSchema>;

interface CreateCampaignModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (data: FormValues) => void;
}

const CreateCampaignModal = ({ isOpen, onClose, onCreate }: CreateCampaignModalProps) => {
  const { register, handleSubmit, control, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(createCampaignSchema),
    defaultValues: {
      status: "Active",
      raisedAmount: "0",
      donorsCount: "0",
    },
  });

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} title="Create Campaign">
      <form onSubmit={handleSubmit(onCreate)} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <FormInput label="Title *" name="title" register={register} error={errors.title} required />
          <FormInput label="Campaign Code *" name="campaignCode" register={register} error={errors.campaignCode} required />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <FormSelect 
            label="Category" 
            name="category" 
            control={control} 
            options={[
              { value: "Emergency Relief", label: "Emergency Relief" },
              { value: "Education", label: "Education" },
              { value: "Food", label: "Food" },
              { value: "Medical", label: "Medical" },
              { value: "Water Relief", label: "Water Relief" },
              { value: "Orphan Support", label: "Orphan Support" },
              { value: "Custom", label: "Custom" }
            ]} 
          />
          <FormSelect 
            label="Campaign Type" 
            name="campaignType" 
            control={control} 
            options={[
              { value: "Monthly", label: "Monthly" },
              { value: "Emergency", label: "Emergency" },
              { value: "Medical", label: "Medical" },
              { value: "Education", label: "Education" },
              { value: "Food", label: "Food" },
              { value: "Winter", label: "Winter" },
              { value: "Custom", label: "Custom" }
            ]} 
          />
          <FormSelect 
            label="Status" 
            name="status" 
            control={control} 
            options={[
              { value: "Active", label: "Active" },
              { value: "Pending", label: "Pending" },
              { value: "Completed", label: "Completed" }
            ]} 
          />
        </div>

        <FormInput label="Short Description" name="shortDescription" register={register} />
        
        <div className="space-y-1">
            <label className="text-sm font-medium">Full Description</label>
            <textarea {...register("fullDescription")} className="w-full p-2 border border-gray-300 rounded-xl dark:bg-zinc-800 dark:border-zinc-700" rows={3} />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <FormInput label="Target Amount (৳) *" name="targetAmount" register={register} type="number" required />
          <FormInput label="Raised Amount (৳)" name="raisedAmount" register={register} type="number" />
          <FormInput label="Donors Count" name="donorsCount" register={register} type="number" />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormInput label="Start Date *" name="startDate" register={register} type="date" required />
          <FormInput label="End Date *" name="endDate" register={register} type="date" required />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormInput label="Thumbnail URL" name="thumbnailUrl" register={register} />
          <FormInput label="Banner URL" name="bannerUrl" register={register} />
        </div>

        <ModalFooter
          onCancel={onClose}
          submitLabel="Create Campaign"
        />
      </form>
    </BaseModal>
  );
};

export default CreateCampaignModal;