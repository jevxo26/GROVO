"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import BaseModal from "./baseModal";
import FormInput from "../forms/formInput";
import FormSelect from "../forms/formSelect";

const schema = z.object({
  name: z.string().min(1, "Required"),
  code: z.string().min(1, "Required"),
  address: z.string().min(1, "Required"),
  type: z.string().min(1, "Required"),
  location: z.string().min(1, "Required"),
  status: z.string().min(1, "Required"),
  established: z.string().min(1, "Required"),
});

type FormValues = z.infer<typeof schema>;

interface Props {
  isOpen: boolean;
  onClose: () => void;
  defaultData: any;
  onSave: (data: FormValues) => void;
}

const EditBranchModal = ({ isOpen, onClose, defaultData, onSave }: Props) => {
  const { register, handleSubmit, control, reset } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      type: "District",
      status: "active",
    },
  });

  useEffect(() => {
    if (defaultData) {
      reset(defaultData);
    }
  }, [defaultData, reset]);

  const branchTypes = [
    { value: "District", label: "District" },
    { value: "Head Office", label: "Head Office" },
    { value: "Division", label: "Division" },
    { value: "Upazila", label: "Upazila" },
    { value: "Union", label: "Union" },
  ];

  const statuses = [
    { value: "active", label: "Active" },
    { value: "pending", label: "Pending" },
  ];

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} title="Edit Branch">
      <form onSubmit={handleSubmit(onSave)} className="space-y-4 text-[#3d2b22] dark:text-zinc-100">
        <FormInput label="Branch Name *" name="name" register={register} />

        <div className="grid grid-cols-2 gap-4">
          <FormInput label="Branch Code *" name="code" register={register} />
          <FormSelect label="Branch Type" name="type" control={control} options={branchTypes} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormSelect label="Status" name="status" control={control} options={statuses} />
          <FormInput label="Established Date" name="established" type="date" register={register} />
        </div>

        <FormInput label="Location *" name="location" register={register} placeholder="e.g. Savar, Dhaka" />
        <FormInput label="Address *" name="address" register={register} />

        <div className="flex justify-end gap-3 mt-6">
          <button type="button" onClick={onClose} className="px-6 py-2 border rounded-xl hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors">
            Cancel
          </button>
          <button type="submit" className="px-6 py-2 bg-[#00a389] text-white rounded-xl hover:bg-[#008f77] transition-colors">
            Save Changes
          </button>
        </div>
      </form>
    </BaseModal>
  );
};

export default EditBranchModal;
