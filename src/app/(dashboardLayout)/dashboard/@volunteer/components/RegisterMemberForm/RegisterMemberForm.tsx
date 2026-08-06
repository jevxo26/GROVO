"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";

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

  const inputStyle =
    "w-full p-3 border border-border rounded-xl bg-card text-card-foreground focus:ring-2 focus:ring-ring outline-none transition-colors";

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-card text-card-foreground p-6 md:p-8 rounded-3xl border border-border shadow-sm max-w-4xl mx-auto space-y-6"
    >
      <div className="flex items-center gap-3 border-b border-border/50 pb-4">
        <div className="w-10 h-10 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
          <UserPlus className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-lg font-extrabold text-foreground tracking-tight">
            New Member Registration
          </h2>
          <p className="text-xs text-muted-foreground">Onboard a new community member into the Ashray system</p>
        </div>
      </div>

      {/* Name Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider">
            First Name
          </label>
          <input {...register("firstName")} className={inputStyle} placeholder="Enter first name" />
          {errors.firstName && <p className="text-destructive text-xs">{errors.firstName.message}</p>}
        </div>
        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider">
            Last Name
          </label>
          <input {...register("lastName")} className={inputStyle} placeholder="Enter last name" />
          {errors.lastName && <p className="text-destructive text-xs">{errors.lastName.message}</p>}
        </div>
      </div>

      {/* Contact Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider">
            Phone Number
          </label>
          <input {...register("phone")} className={inputStyle} placeholder="+880 1XXX-XXXXXX" />
          {errors.phone && <p className="text-destructive text-xs">{errors.phone.message}</p>}
        </div>
        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider">
            Email (Optional)
          </label>
          <input {...register("email")} className={inputStyle} placeholder="email@example.com" />
          {errors.email && <p className="text-destructive text-xs">{errors.email.message}</p>}
        </div>
      </div>

      {/* Membership Type */}
      <div className="space-y-1.5">
        <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider">
          Membership Type
        </label>
        <select {...register("membershipType")} className={inputStyle}>
          <option value="">Select membership type...</option>
          <option value="general">General Member</option>
          <option value="premium">Executive Member</option>
        </select>
        {errors.membershipType && <p className="text-destructive text-xs">{errors.membershipType.message}</p>}
      </div>

      {/* Address */}
      <div className="space-y-1.5">
        <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider">
          Full Address
        </label>
        <input {...register("address")} className={inputStyle} placeholder="Enter full address" />
        {errors.address && <p className="text-destructive text-xs">{errors.address.message}</p>}
      </div>

      {/* Location Selectors */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider">District</label>
          <select {...register("district")} className={inputStyle}>
            <option value="">Select district</option>
            {locations.districts.map((d) => (
              <option key={d} value={d.toLowerCase()}>{d}</option>
            ))}
          </select>
          {errors.district && <p className="text-destructive text-xs">{errors.district.message}</p>}
        </div>
        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider">Upazila</label>
          <select {...register("upazila")} className={inputStyle}>
            <option value="">Select upazila</option>
            {locations.upazilas.map((u) => (
              <option key={u} value={u.toLowerCase()}>{u}</option>
            ))}
          </select>
          {errors.upazila && <p className="text-destructive text-xs">{errors.upazila.message}</p>}
        </div>
        <div className="space-y-1.5">
          <label className="block text-xs font-bold text-muted-foreground uppercase tracking-wider">Union</label>
          <select {...register("union")} className={inputStyle}>
            <option value="">Select union</option>
            {locations.unions.map((u) => (
              <option key={u} value={u.toLowerCase()}>{u}</option>
            ))}
          </select>
          {errors.union && <p className="text-destructive text-xs">{errors.union.message}</p>}
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-4 pt-4 border-t border-border/50">
        <Button type="submit" disabled={isSubmitting} className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl font-bold">
          {isSubmitting ? "Submitting..." : "Submit Registration"}
        </Button>
        <Button type="button" variant="outline" onClick={() => reset()} className="rounded-xl border-border">
          Clear Form
        </Button>
      </div>
    </form>
  );
};
