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

// Branch Type Options
const branchTypeOptions = [
  { value: "District", label: "District" },
  { value: "Head Office", label: "Head Office" },
  { value: "Division", label: "Division" },
  { value: "Upazila", label: "Upazila" },
  { value: "Union", label: "Union" },
];

// Status Options
const statusOptions = [
  { value: "Active", label: "Active" },
  { value: "Pending", label: "Pending" },
];

const branchSchema = z.object({
  name: z.string().min(1, "Branch name is required"),
  code: z.string().min(1, "Branch code is required"),
  type: z.string().min(1, "Branch type is required"),
  status: z.string().min(1, "Status is required"),
  division: z.string().min(1, "Division is required"),
  district: z.string().min(1, "District is required"),
  upazila: z.string().optional(),
  union: z.string().optional(),
  address: z.string().min(1, "Address is required"),
  established: z.string().min(1, "Established date is required"),
});

export type BranchData = z.infer<typeof branchSchema>;

interface EditBranchModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultData?: BranchData | null;
  onSave: (data: BranchData) => void;
}

const EditBranchModal = ({ isOpen, onClose, defaultData, onSave }: EditBranchModalProps) => {
  const { register, handleSubmit, control, formState: { errors }, reset, setValue } = useForm<BranchData>({
    resolver: zodResolver(branchSchema),
  });

  useEffect(() => {
    if (defaultData) {
      reset(defaultData);
    }
  }, [defaultData, reset]);

  const selectedDivision = useWatch({ control, name: "division" });
  const districtOptions = getDistrictOptions(selectedDivision);

  useEffect(() => {
    if (selectedDivision && divisionsData[selectedDivision]) {
      const districts = divisionsData[selectedDivision];
      // Only auto-set district if editing and division changed from original
      if (defaultData && selectedDivision !== defaultData.division && districts.length > 0) {
        setValue("district", districts[0]);
      }
    }
  }, [selectedDivision, setValue, defaultData]);

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} title="Edit Branch">
      <form onSubmit={handleSubmit(onSave)} className="space-y-4 text-[#3d2b22] dark:text-zinc-100">
        <FormInput label="Branch Name" name="name" register={register} error={errors.name} required placeholder="e.g. ASHRAY Chattogram Division" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormInput label="Branch Code" name="code" register={register} error={errors.code} required />
          <FormSelect label="Branch Type" name="type" control={control} options={branchTypeOptions} />
          <FormSelect label="Status" name="status" control={control} options={statusOptions} />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <FormSelect label="Division" name="division" control={control} options={divisionOptions} />
          <FormSelect label="District" name="district" control={control} options={districtOptions} />
          <FormInput label="Upazila" name="upazila" register={register} placeholder="e.g. Savar" />
          <FormInput label="Union" name="union" register={register} placeholder="e.g. Tetuljhora" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormInput label="Address" name="address" register={register} error={errors.address} required placeholder="Full street address..." />
          <FormInput label="Established Date" name="established" type="date" register={register} />
        </div>

        <ModalFooter
          onCancel={onClose}
          submitLabel="Save Changes"
        />
      </form>
    </BaseModal>
  );
};

export default EditBranchModal;