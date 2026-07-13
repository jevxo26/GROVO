"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

interface FormData {
  firstName: string;
  lastName: string;
  phone: string;
  email?: string;
  membershipType: string;
  address: string;
  district: string;
  upazila: string;
  union: string;
}

const schema: yup.ObjectSchema<FormData> = yup.object({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  phone: yup.string().required("Phone number is required"),
  email: yup.string().email("Invalid email format").optional(),
  membershipType: yup.string().required("Please select a membership type"),
  address: yup.string().required("Address is required"),
  district: yup.string().required("Select district"),
  upazila: yup.string().required("Select upazila"),
  union: yup.string().required("Select union"),
});

const locations = {
  districts: ["Dhaka", "Sylhet", "Rangpur", "Chittagong"],
  upazilas: ["Savar", "Dhamrai", "Ashulia"],
  unions: ["Union 1", "Union 2", "Union 3"],
};

export const RegisterMemberForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    console.log("Form Data Submitted:", data);
    alert("Form submitted successfully!");
    reset();
  };

  // কমন স্টাইল অবজেক্ট (সহজ করার জন্য)
  const inputStyle =
    "w-full p-3 border rounded-lg bg-white dark:bg-[#120f0d] dark:border-[#2f2824] dark:text-white";

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white dark:bg-[#1a1716] p-8 rounded-2xl border border-gray-100 dark:border-[#2f2824] shadow-sm max-w-4xl mx-auto transition-colors"
    >
      <h2 className="text-lg font-bold mb-6 text-gray-900 dark:text-gray-100">
        NEW MEMBER DETAILS
      </h2>

      {/* Name */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
            First Name
          </label>
          <input
            {...register("firstName")}
            className={inputStyle}
            placeholder="Enter first name"
          />
          <p className="text-red-500 text-xs">{errors.firstName?.message}</p>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
            Last Name
          </label>
          <input
            {...register("lastName")}
            className={inputStyle}
            placeholder="Enter last name"
          />
          <p className="text-red-500 text-xs">{errors.lastName?.message}</p>
        </div>
      </div>

      {/* Contact */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
            Phone Number
          </label>
          <input
            {...register("phone")}
            className={inputStyle}
            placeholder="+880 1XXX-XXXXXX"
          />
          <p className="text-red-500 text-xs">{errors.phone?.message}</p>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
            Email (optional)
          </label>
          <input
            {...register("email")}
            className={inputStyle}
            placeholder="email@example.com"
          />
          <p className="text-red-500 text-xs">{errors.email?.message}</p>
        </div>
      </div>

      {/* Membership */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
          Membership Type
        </label>
        <select {...register("membershipType")} className={inputStyle}>
          <option value="">Select type...</option>
          <option value="general">General</option>
          <option value="premium">Premium</option>
        </select>
        <p className="text-red-500 text-xs">{errors.membershipType?.message}</p>
      </div>

      {/* Address */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">
          Address
        </label>
        <input
          {...register("address")}
          className={inputStyle}
          placeholder="Enter address"
        />
        <p className="text-red-500 text-xs">{errors.address?.message}</p>
      </div>

      {/* Location */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {/* District Select */}
        <div>
          <select {...register("district")} className={inputStyle}>
            <option value="">District</option>
            {locations.districts.map((d) => (
              <option key={d} value={d.toLowerCase()}>
                {d}
              </option>
            ))}
          </select>
          <p className="text-red-500 text-xs">{errors.district?.message}</p>
        </div>

        {/* Upazila Select */}
        <div>
          <select {...register("upazila")} className={inputStyle}>
            <option value="">Upazila</option>
            {locations.upazilas.map((u) => (
              <option key={u} value={u.toLowerCase()}>
                {u}
              </option>
            ))}
          </select>
          <p className="text-red-500 text-xs">{errors.upazila?.message}</p>
        </div>

        {/* Union Select */}
        <div>
          <select {...register("union")} className={inputStyle}>
            <option value="">Union</option>
            {locations.unions.map((u) => (
              <option key={u} value={u.toLowerCase()}>
                {u}
              </option>
            ))}
          </select>
          <p className="text-red-500 text-xs">{errors.union?.message}</p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-[#009688] hover:bg-[#00796b] text-white px-6 py-3 rounded-lg font-medium transition-colors"
        >
          {isSubmitting ? "Submitting..." : "Submit Registration"}
        </button>
        <button
          type="button"
          onClick={() => reset()}
          className="px-6 py-3 rounded-lg border border-gray-200 dark:border-[#2f2824] dark:text-white hover:bg-gray-50 dark:hover:bg-[#2f2824] transition-colors"
        >
          Clear
        </button>
      </div>
    </form>
  );
};
