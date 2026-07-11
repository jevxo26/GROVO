"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import BaseModal from "./baseModal";
import FormInput from "../forms/formInput";
import FormSelect from "../forms/formSelect";

const categoryOptions = [{ value: "Emergency Relief", label: "Emergency Relief" }, { value: "Education", label: "Education" }, { value: "Medical", label: "Medical" }];
const typeOptions = [{ value: "emergency", label: "Emergency" }, { value: "regular", label: "Regular" }];
const statusOptions = [{ value: "Active", label: "Active" }, { value: "Pending", label: "Pending" }, { value: "Completed", label: "Completed" }];

const campaignSchema = z.object({
  title: z.string().min(1, "Title is required"),
  campaignCode: z.string().min(1, "Campaign code is required"),
  category: z.string().min(1, "Category is required"),
  campaignType: z.string().min(1, "Campaign type is required"),
  status: z.string().min(1, "Status is required"),
  shortDescription: z.string().optional(),
  fullDescription: z.string().optional(),
  targetAmount: z.string().min(1, "Target amount is required"),
  raisedAmount: z.string().default("0"),
  donorsCount: z.string().default("0"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
  thumbnailUrl: z.string().optional(),
  bannerUrl: z.string().optional(),
});

type CampaignFormValues = z.infer<typeof campaignSchema>;

const CreateCampaignModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const { register, handleSubmit, control, formState: { errors }, reset } = useForm<CampaignFormValues>({
    resolver: zodResolver(campaignSchema),
    defaultValues: { campaignCode: "CAM-2026-009", category: "Emergency Relief", campaignType: "emergency", status: "Active", raisedAmount: "0", donorsCount: "0" },
  });

  const onSubmit = (data: CampaignFormValues) => { console.log(data); reset(); onClose(); };

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} title="Create Campaign">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-[#5c4033] dark:text-zinc-100 font-medium max-w-3xl mx-auto max-h-[80vh] overflow-y-auto pr-2">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormInput label="Title" name="title" register={register} error={errors.title} placeholder="Enter campaign title" required />
          <FormInput label="Campaign Code" name="campaignCode" register={register} error={errors.campaignCode} required />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormSelect label="Category" name="category" control={control} options={categoryOptions} />
          <FormSelect label="Campaign Type" name="campaignType" control={control} options={typeOptions} />
          <FormSelect label="Status" name="status" control={control} options={statusOptions} />
        </div>

        <FormInput label="Short Description" name="shortDescription" register={register} placeholder="Brief summary shown on cards..." />
        <FormInput label="Full Description" name="fullDescription" register={register} placeholder="Detailed campaign description..." />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormInput label="Target Amount (৳)" name="targetAmount" type="number" register={register} error={errors.targetAmount} placeholder="Enter amount" required />
          <FormInput label="Raised Amount (৳)" name="raisedAmount" type="number" register={register} />
          <FormInput label="Donors Count" name="donorsCount" type="number" register={register} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormInput label="Start Date" name="startDate" type="date" register={register} error={errors.startDate} required />
          <FormInput label="End Date" name="endDate" type="date" register={register} error={errors.endDate} required />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormInput label="Thumbnail URL" name="thumbnailUrl" register={register} placeholder="https://..." />
          <FormInput label="Banner URL" name="bannerUrl" register={register} placeholder="https://..." />
        </div>

        <div className="flex justify-end gap-3 pt-6 border-t dark:border-zinc-800">
          <button type="button" onClick={() => { reset(); onClose(); }} className="px-6 py-2.5 border border-[#e8dfd8] dark:border-zinc-700 rounded-xl text-sm font-semibold text-[#5c4033] dark:text-zinc-200 hover:bg-[#fbf7f4] dark:hover:bg-zinc-800 transition-colors">
            Cancel
          </button>
          <button type="submit" className="px-6 py-2.5 bg-[#00a389] hover:bg-[#008f77] text-white text-sm font-semibold rounded-xl transition-colors shadow-sm">
            Create Campaign
          </button>
        </div>
      </form>
    </BaseModal>
  );
};

export default CreateCampaignModal;