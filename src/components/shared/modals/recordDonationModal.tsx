"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import BaseModal from "./baseModal";
import FormInput from "../forms/formInput";
import FormSelect from "../forms/formSelect";

const campaignOptions = [{ value: "Emergency Flood Relief", label: "Emergency Flood Relief" }, { value: "Winter Warmth", label: "Winter Warmth" }, { value: "Education Program", label: "Education Program" }];
const categoryOptions = [{ value: "Emergency Relief", label: "Emergency Relief" }, { value: "Zakat", label: "Zakat" }, { value: "General Donation", label: "General Donation" }];
const typeOptions = [{ value: "one time", label: "one time" }, { value: "Monthly", label: "Monthly" }];
const statusOptions = [{ value: "Completed", label: "Completed" }, { value: "Pending", label: "Pending" }];

const donationSchema = z.object({
  donorName: z.string().min(1, "Donor name is required"),
  receiptNumber: z.string().min(1, "Receipt number is required"),
  amount: z.string().min(1, "Amount is required"),
  campaign: z.string().min(1, "Campaign is required"),
  category: z.string().min(1, "Category is required"),
  donationType: z.string().min(1, "Donation type is required"),
  paymentStatus: z.string().min(1, "Payment status is required"),
  date: z.string().min(1, "Date is required"),
});

type DonationFormValues = z.infer<typeof donationSchema>;

const RecordDonationModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const { register, handleSubmit, control, formState: { errors }, reset } = useForm<DonationFormValues>({
    resolver: zodResolver(donationSchema),
    defaultValues: { receiptNumber: "DON-2026-0009", campaign: "Emergency Flood Relief", category: "Emergency Relief", donationType: "one time", paymentStatus: "Completed", date: "2026-07-11" },
  });

  const onSubmit = (data: DonationFormValues) => { console.log(data); reset(); onClose(); };

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} title="Record Donation">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-[#5c4033] dark:text-zinc-100 font-medium max-w-2xl mx-auto">
        <div>
          <FormInput label="Donor Name" name="donorName" register={register} error={errors.donorName} placeholder="Enter donor name" required />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormInput label="Receipt Number" name="receiptNumber" register={register} error={errors.receiptNumber} required />
          <FormInput label="Amount (৳)" name="amount" type="number" register={register} error={errors.amount} placeholder="Enter amount" required />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormSelect label="Campaign" name="campaign" control={control} options={campaignOptions} />
          <FormSelect label="Category" name="category" control={control} options={categoryOptions} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormSelect label="Donation Type" name="donationType" control={control} options={typeOptions} />
          <FormSelect label="Payment Status" name="paymentStatus" control={control} options={statusOptions} />
          <FormInput label="Date" name="date" type="date" register={register} />
        </div>

        <div className="flex justify-end gap-3 pt-6 border-t dark:border-zinc-800">
          <button type="button" onClick={() => { reset(); onClose(); }} className="px-6 py-2.5 border border-[#e8dfd8] dark:border-zinc-700 rounded-xl text-sm font-semibold text-[#5c4033] dark:text-zinc-200 hover:bg-[#fbf7f4] dark:hover:bg-zinc-800 transition-colors">
            Cancel
          </button>
          <button type="submit" className="px-6 py-2.5 bg-[#00a389] hover:bg-[#008f77] text-white text-sm font-semibold rounded-xl transition-colors shadow-sm">
            Record Donation
          </button>
        </div>
      </form>
    </BaseModal>
  );
};

export default RecordDonationModal;