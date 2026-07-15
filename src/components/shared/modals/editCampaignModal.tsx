"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import BaseModal from "./baseModal";
import FormInput from "../forms/formInput";
import FormSelect from "../forms/formSelect";

const editCampaignSchema = z.object({
  title: z.string().min(1, "Required"),
  campaignCode: z.string().min(1, "Required"),
  category: z.string().min(1, "Required"),
  campaignType: z.string().min(1, "Required"),
  status: z.string().min(1, "Required"),
  shortDescription: z.string().optional(),
  fullDescription: z.string().optional(),
  targetAmount: z.any().optional(),
  raisedAmount: z.any().optional(),
  donorsCount: z.any().optional(),
  startDate: z.string().min(1, "Required"),
  endDate: z.string().min(1, "Required"),
  thumbnailUrl: z.string().optional(),
  bannerUrl: z.string().optional(),
});

type FormValues = z.infer<typeof editCampaignSchema>;

interface EditCampaignModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultData: any;
  onSave: (data: FormValues) => void;
}

const EditCampaignModal = ({ isOpen, onClose, defaultData, onSave }: EditCampaignModalProps) => {
  const { register, handleSubmit, control, reset, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(editCampaignSchema),
  });

  useEffect(() => {
    if (defaultData) {
      reset({
        title: defaultData.name || "",
        campaignCode: defaultData.code || "",
        category: defaultData.category || "",
        campaignType: defaultData.type || "Monthly",
        status: defaultData.status || "Active",
        shortDescription: defaultData.shortDescription || "",
        fullDescription: defaultData.fullDescription || "",
        targetAmount: defaultData.target ? String(defaultData.target) : "",
        raisedAmount: defaultData.raised ? String(defaultData.raised) : "",
        donorsCount: defaultData.donors ? String(defaultData.donors) : "",
        startDate: defaultData.startDate || "",
        endDate: defaultData.endDate || "",
        thumbnailUrl: defaultData.thumbnailUrl || "",
        bannerUrl: defaultData.bannerUrl || "",
      });
    }
  }, [defaultData, reset]);

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} title="Edit Campaign">
      <form onSubmit={handleSubmit(onSave)} className="space-y-4">
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

        <div className="flex justify-end gap-3 pt-4 border-t dark:border-zinc-800">
          <button type="button" onClick={onClose} className="px-6 py-2 border border-gray-200 dark:border-zinc-700 rounded-xl text-sm font-semibold hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors">
            Cancel
          </button>
          <button type="submit" className="px-6 py-2 bg-[#00a389] hover:bg-[#008f77] text-white text-sm font-semibold rounded-xl transition-colors">
            Save Changes
          </button>
        </div>
      </form>
    </BaseModal>
  );
};

export default EditCampaignModal;