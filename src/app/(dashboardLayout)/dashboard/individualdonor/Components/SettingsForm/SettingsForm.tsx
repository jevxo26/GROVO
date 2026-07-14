"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  monthlyContribution: number;
  autoRenew: boolean;
}

const schema: yup.ObjectSchema<FormValues> = yup.object({
  firstName: yup.string().required("Required"),
  lastName: yup.string().required("Required"),
  email: yup.string().email("Invalid email").required("Required"),
  phone: yup.string().required("Required"),
  monthlyContribution: yup.number().typeError("Must be a number").required("Required"),
  autoRenew: yup.boolean().required(),
});

interface SettingsFormProps {
  defaultValues: FormValues;
  onSave: (data: FormValues) => void;
}

export const SettingsForm: React.FC<SettingsFormProps> = ({ defaultValues, onSave }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    resolver: yupResolver(schema),
    defaultValues,
  });

  return (
    <form onSubmit={handleSubmit(onSave)} className="bg-white dark:bg-[#1a1716] p-8 rounded-2xl border border-[#efe9e6] dark:border-[#2f2824] shadow-sm">
      
      <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-6">Personal Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {(['firstName', 'lastName', 'email', 'phone'] as const).map((field) => (
          <div key={field} className="flex flex-col gap-2">
            <label className="text-sm text-gray-600 dark:text-gray-400 capitalize">{field.replace(/([A-Z])/g, ' $1')}</label>
            <input 
              {...register(field)} 
              className="p-3 rounded-lg border border-[#efe9e6] dark:border-[#2f2824] bg-transparent focus:outline-none focus:ring-2 focus:ring-[#8b4513]/20"
            />
            {errors[field] && <p className="text-red-500 text-xs">{errors[field]?.message}</p>}
          </div>
        ))}
      </div>

      <hr className="border-[#efe9e6] dark:border-[#2f2824] mb-8" />

      <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100 mb-6">Donation Preferences</h2>
      <div className="flex flex-col md:flex-row gap-6 mb-8 items-end">
        <div className="flex flex-col gap-2 w-full md:w-1/2">
          <label className="text-sm text-gray-600 dark:text-gray-400">Monthly Contribution</label>
          <input {...register("monthlyContribution")} className="p-3 rounded-lg border border-[#efe9e6] dark:border-[#2f2824] bg-transparent focus:outline-none focus:ring-2 focus:ring-[#8b4513]/20" />
          {errors.monthlyContribution && <p className="text-red-500 text-xs">{errors.monthlyContribution.message}</p>}
        </div>
        
        <div className="flex items-center gap-4 h-13">
          <label className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" {...register("autoRenew")} className="sr-only peer" />
            <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:bg-[#8b4513] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"></div>
          </label>
          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Auto-renew monthly</span>
        </div>
      </div>

      <button type="submit" className="px-6 py-2.5 bg-[#8b4513] text-white rounded-lg hover:bg-[#6e370f] transition-colors font-medium">
        Save Changes
      </button>
    </form>
  );
};