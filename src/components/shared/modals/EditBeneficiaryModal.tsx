"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import BaseModal from "./baseModal";
import FormInput from "../forms/formInput";
import FormSelect from "../forms/formSelect";
import ModalFooter from "./ModalFooter";
import { divisionOptions, getDistrictOptions } from "@/data/locationData";

const schema = z.object({
  fullName: z.string().min(1, "Required"),
  code: z.string().min(1, "Required"),
  phone: z.string().min(1, "Required"),
  date: z.string().min(1, "Required"),
  category: z.string().min(1, "Required"),
  status: z.string().min(1, "Required"),
  division: z.string().min(1, "Required"),
  district: z.string().min(1, "Required"),
  upazila: z.string().min(1, "Required"),
  union: z.string().min(1, "Required"),
  address: z.string().min(1, "Required"),
});

type FormValues = z.infer<typeof schema>;

interface Props {
  isOpen: boolean;
  onClose: () => void;
  defaultData?: FormValues | null;
  onSave: (data: FormValues) => void;
}

const categories = [
  { value: "Flood Victim", label: "Flood Victim" },
  { value: "Orphan", label: "Orphan" },
  { value: "Medical Need", label: "Medical Need" },
  { value: "Education", label: "Education" },
  { value: "Food Security", label: "Food Security" },
  { value: "Winter Relief", label: "Winter Relief" },
  { value: "Emergency", label: "Emergency" },
  { value: "Other", label: "Other" },
];

const statuses = [
  { value: "Active", label: "Active" },
  { value: "Assisted", label: "Assisted" },
  { value: "Pending", label: "Pending" },
];

const EditBeneficiaryModal = ({ isOpen, onClose, defaultData, onSave }: Props) => {
  const { register, handleSubmit, control, reset, watch } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      category: "Flood Victim",
      status: "Active",
      division: "Dhaka",
      district: "Dhaka",
    },
  });

  useEffect(() => {
    if (defaultData) {
      reset(defaultData);
    }
  }, [defaultData, reset]);

  const selectedDivision = watch("division");
  const districts = getDistrictOptions(selectedDivision);

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} title="Edit Beneficiary">
      <form onSubmit={handleSubmit(onSave)} className="space-y-4">
        {/* Full Name */}
        <FormInput label="Full Name *" name="fullName" register={register} />

        {/* Row 1 */}
        <div className="grid grid-cols-3 gap-4">
          <FormInput label="Beneficiary Code *" name="code" register={register} />
          <FormInput label="Phone *" name="phone" register={register} />
          <FormInput label="Registered Date" name="date" type="date" register={register} />
        </div>

        {/* Row 2 */}
        <div className="grid grid-cols-3 gap-4">
          <FormSelect label="Category" name="category" control={control} options={categories} />
          <FormSelect label="Status" name="status" control={control} options={statuses} />
          <FormSelect label="Division" name="division" control={control} options={divisionOptions} />
        </div>

        {/* Row 3 */}
        <div className="grid grid-cols-3 gap-4">
          <FormSelect label="District" name="district" control={control} options={districts} />
          <FormInput label="Upazila" name="upazila" register={register} />
          <FormInput label="Union" name="union" register={register} />
        </div>

        {/* Address */}
        <FormInput label="Address *" name="address" register={register} />

        <ModalFooter
          onCancel={onClose}
          submitLabel="Save Changes"
        />
      </form>
    </BaseModal>
  );
};

export default EditBeneficiaryModal;