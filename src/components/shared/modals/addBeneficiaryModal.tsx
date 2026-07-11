"use client";

import React, { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import BaseModal from "./baseModal";
import FormInput from "../forms/formInput";
import FormSelect from "../forms/formSelect";
// আপনার তৈরি করা টেক্সট-এরিয়া কম্পোনেন্ট (যদি ফোল্ডার পাথ আলাদা হয় তবে চেঞ্জ করে নেবেন)
import FormTextarea from "../forms/formTextarea"; 

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
const categoryOptions = [{ value: "Flood Victim", label: "Flood Victim" }, { value: "Drought Affected", label: "Drought Affected" }, { value: "General", label: "General" }];
const statusOptions = [{ value: "Active", label: "Active" }, { value: "Pending", label: "Pending" }];

const beneficiarySchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  beneficiaryCode: z.string().min(1, "Beneficiary code is required"),
  phone: z.string().min(1, "Phone number is required"),
  registeredDate: z.string().min(1, "Registered date is required"),
  category: z.string().min(1, "Category is required"),
  status: z.string().min(1, "Status is required"),
  division: z.string().min(1, "Division is required"),
  district: z.string().min(1, "District is required"),
  upazila: z.string().optional(),
  union: z.string().optional(),
  address: z.string().min(1, "Address is required"),
});

type BeneficiaryFormValues = z.infer<typeof beneficiarySchema>;

const AddBeneficiaryModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const { register, handleSubmit, control, formState: { errors }, reset, setValue } = useForm<BeneficiaryFormValues>({
    resolver: zodResolver(beneficiarySchema),
    defaultValues: { 
      beneficiaryCode: "BEN-2026-0009", 
      status: "Active", 
      division: "Dhaka", 
      district: "Dhaka", 
      registeredDate: "2026-07-11" 
    },
  });

  const selectedDivision = useWatch({ control, name: "division" });
  const districtOptions = selectedDivision && divisionsData[selectedDivision] 
    ? divisionsData[selectedDivision].map((dist) => ({ value: dist, label: dist })) 
    : [];

  useEffect(() => {
    if (selectedDivision) {
      const districts = divisionsData[selectedDivision] || [];
      if (districts.length > 0) setValue("district", districts[0]);
    }
  }, [selectedDivision, setValue]);

  const onSubmit = (data: BeneficiaryFormValues) => { 
    console.log(data); 
    reset(); 
    onClose(); 
  };

  return (
    // ফিক্স ১: maxWidth প্রপস পাস করা হলো যাতে ৩-কলাম রেসপন্সিভ গ্রিড ফুল স্পেস পায়
    <BaseModal isOpen={isOpen} onClose={onClose} title="Add Beneficiary" maxWidth="max-w-3xl">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 text-[#5c4033] dark:text-zinc-100 font-medium w-full mx-auto">
        
        {/* Full Name */}
        <div>
          <FormInput label="Full Name" name="fullName" register={register} error={errors.fullName} placeholder="Enter full name" required />
        </div>

        {/* Row 1: Code, Phone, Date */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormInput label="Beneficiary Code" name="beneficiaryCode" register={register} error={errors.beneficiaryCode} required />
          <FormInput label="Phone" name="phone" register={register} error={errors.phone} placeholder="Enter phone number" required />
          <FormInput label="Registered Date" name="registeredDate" type="date" register={register} />
        </div>

        {/* Row 2: Category, Status, Division */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormSelect label="Category" name="category" control={control} options={categoryOptions} />
          <FormSelect label="Status" name="status" control={control} options={statusOptions} />
          <FormSelect label="Division" name="division" control={control} options={divisionOptions} />
        </div>

        {/* Row 3: District, Upazila, Union */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormSelect label="District" name="district" control={control} options={districtOptions} />
          <FormInput label="Upazila" name="upazila" register={register} placeholder="e.g. Savar" />
          <FormInput label="Union" name="union" register={register} placeholder="e.g. Tetuljhora" />
        </div>

        {/* ফিক্স ২: এড্রেস ফিল্ডে টেক্সট-এরিয়া ব্যবহার (ইমেজের ডিজাইন কনসিস্টেন্সির জন্য) */}
        <div>
          <FormTextarea 
            label="Address" 
            name="address" 
            register={register} 
            error={errors.address} 
            placeholder="Village, Ward details..." 
            required 
            // rows={2}
          />
        </div>

        {/* Footer Buttons */}
        <div className="flex justify-end gap-3 pt-5 border-t border-gray-100 dark:border-zinc-800">
          <button 
            type="button" 
            onClick={() => { reset(); onClose(); }} 
            className="px-6 py-2.5 border border-[#e8dfd8] dark:border-zinc-700 rounded-xl text-sm font-semibold text-[#5c4033] dark:text-zinc-200 hover:bg-[#fbf7f4] dark:hover:bg-zinc-800 transition-colors"
          >
            Cancel
          </button>
          <button 
            type="submit" 
            className="px-6 py-2.5 bg-[#00a389] hover:bg-[#008f77] text-white text-sm font-semibold rounded-xl transition-colors shadow-sm"
          >
            Add Beneficiary
          </button>
        </div>
      </form>
    </BaseModal>
  );
};

export default AddBeneficiaryModal;