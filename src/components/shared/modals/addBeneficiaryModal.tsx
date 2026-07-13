"use client";

import React, { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import BaseModal from "./baseModal";
import FormInput from "../forms/formInput";
import FormSelect from "../forms/formSelect";
import FormTextarea from "../forms/formTextarea"; 
import ModalFooter from "./ModalFooter";
import { divisionsData, divisionOptions, getDistrictOptions } from "@/data/locationData";

const categoryOptions = [{ value: "Flood Victim", label: "Flood Victim" }, { value: "Orphan", label: "Orphan" }, { value: "Medical Need", label: "Medical Need" }, { value: "Education", label: "Education" }, { value: "Food Security", label: "Food Security" }, { value: "Winter Relief", label: "Winter Relief" }, { value: "Emergency", label: "Emergency" }, { value: "General", label: "General" }, { value: "Other", label: "Other" }];
const statusOptions = [{ value: "Active", label: "Active" }, { value: "Assisted", label: "Assisted" }, { value: "Pending", label: "Pending" }];

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
  const districtOptions = getDistrictOptions(selectedDivision);

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
    <BaseModal isOpen={isOpen} onClose={onClose} title="Add Beneficiary" size="3xl">
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
        <div>
          <FormTextarea 
            label="Address" 
            name="address" 
            register={register} 
            error={errors.address} 
            placeholder="Village, Ward details..." 
            required 
          />
        </div>

        <ModalFooter
          onCancel={onClose}
          onReset={reset}
          submitLabel="Add Beneficiary"
        />
      </form>
    </BaseModal>
  );
};

export default AddBeneficiaryModal;