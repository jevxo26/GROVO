// "use client";

// import React, { useEffect } from "react";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";
// import BaseModal from "./baseModal";
// import FormInput from "../forms/formInput";
// import FormSelect from "../forms/formSelect";

// const volunteerSchema = z.object({
//   fullName: z.string().min(1, "Full name is required"),
//   volunteerCode: z.string().min(1, "Volunteer code is required"),
//   status: z.enum(["active", "pending"]),
//   division: z.string().min(1, "Division is required"),
//   district: z.string().min(1, "District is required"),
//   upazila: z.string().optional(),
//   membersRecruited: z.string().optional(),
//   performanceScore: z.string().optional(),
//   rank: z.enum(["Gold", "Silver", "Bronze"]).optional(),
// });

// type VolunteerFormValues = z.infer<typeof volunteerSchema>;

// interface EditVolunteerModalProps {
//   isOpen: boolean;
//   onClose: () => void;
//   initialData?: Partial<VolunteerFormValues> | null;
// }

// const EditVolunteerModal = ({
//   isOpen,
//   onClose,
//   initialData,
// }: EditVolunteerModalProps) => {
//   const {
//     register,
//     handleSubmit,
//     control,
//     formState: { errors },
//     reset,
//   } = useForm<VolunteerFormValues>({
//     resolver: zodResolver(volunteerSchema),
//     defaultValues: {
//       fullName: "",
//       volunteerCode: "",
//       status: "active",
//       division: "",
//       district: "",
//       upazila: "",
//       membersRecruited: "0",
//       performanceScore: "0",
//       rank: "Bronze",
//     },
//   });

//   useEffect(() => {
//     if (initialData) {
//       reset({
//         ...initialData,
//         status: initialData.status ?? "active",
//         rank: initialData.rank ?? "Bronze",
//       });
//     }
//   }, [initialData, reset]);

//   const onSubmit = (data: VolunteerFormValues) => {
//     console.log("Updated Volunteer:", data);
//     onClose();
//   };

//   return (
//     <BaseModal isOpen={isOpen} onClose={onClose} title="Edit Volunteer">
//       <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//         <FormInput
//           label="Full Name *"
//           name="fullName"
//           register={register}
//           error={errors.fullName}
//         />

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <FormInput
//             label="Volunteer Code *"
//             name="volunteerCode"
//             register={register}
//             error={errors.volunteerCode}
//           />

//           <FormSelect
//             label="Status"
//             name="status"
//             control={control}
//             options={[
//               { value: "active", label: "Active" },
//               { value: "pending", label: "Pending" },
//             ]}
//           />
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           <FormSelect
//             label="Division"
//             name="division"
//             control={control}
//             options={[
//               { value: "Dhaka", label: "Dhaka" },
//               { value: "Chattogram", label: "Chattogram" },
//               { value: "Rajshahi", label: "Rajshahi" },
//               { value: "Khulna", label: "Khulna" },
//               { value: "Barishal", label: "Barishal" },
//               { value: "Sylhet", label: "Sylhet" },
//               { value: "Rangpur", label: "Rangpur" },
//               { value: "Mymensingh", label: "Mymensingh" },
//             ]}
//           />

//           <FormSelect
//             label="District *"
//             name="district"
//             control={control}
//             options={[
//               { value: "Dhaka", label: "Dhaka" },
//               { value: "Gazipur", label: "Gazipur" },
//               { value: "Narayanganj", label: "Narayanganj" },
//               { value: "Manikganj", label: "Manikganj" },
//               { value: "Tangail", label: "Tangail" },
//               { value: "Faridpur", label: "Faridpur" },
//               { value: "Chattogram", label: "Chattogram" },
//               { value: "Cumilla", label: "Cumilla" },
//               { value: "Noakhali", label: "Noakhali" },
//               { value: "Cox's Bazar", label: "Cox's Bazar" },
//               { value: "Rajshahi", label: "Rajshahi" },
//               { value: "Khulna", label: "Khulna" },
//               { value: "Sylhet", label: "Sylhet" },
//             ]}
//           />

//           <FormInput
//             label="Upazila"
//             name="upazila"
//             register={register}
//           />
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           <FormInput
//             label="Members Recruited"
//             name="membersRecruited"
//             register={register}
//           />

//           <FormInput
//             label="Performance Score"
//             name="performanceScore"
//             register={register}
//           />

//           <FormSelect
//             label="Rank"
//             name="rank"
//             control={control}
//             options={[
//               { value: "Gold", label: "Gold" },
//               { value: "Silver", label: "Silver" },
//               { value: "Bronze", label: "Bronze" },
//             ]}
//           />
//         </div>

        
//       </form>
//     </BaseModal>
//   );
// };

// export default EditVolunteerModal;


"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import BaseModal from "./baseModal";
import FormInput from "../forms/formInput";
import FormSelect from "../forms/formSelect";

const volunteerSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  volunteerCode: z.string().min(1, "Volunteer code is required"),
  status: z.enum(["active", "pending"]),
  division: z.string().min(1, "Division is required"),
  district: z.string().min(1, "District is required"),
  upazila: z.string().optional(),
  membersRecruited: z.string().optional(),
  performanceScore: z.string().optional(),
  rank: z.enum(["Gold", "Silver", "Bronze"]).optional(),
});

type VolunteerFormValues = z.infer<typeof volunteerSchema>;

interface EditVolunteerModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialData?: Partial<VolunteerFormValues> | null;
}

const EditVolunteerModal = ({
  isOpen,
  onClose,
  initialData,
}: EditVolunteerModalProps) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<VolunteerFormValues>({
    resolver: zodResolver(volunteerSchema),
    defaultValues: {
      fullName: "",
      volunteerCode: "",
      status: "active",
      division: "",
      district: "",
      upazila: "",
      membersRecruited: "0",
      performanceScore: "0",
      rank: "Bronze",
    },
  });

  useEffect(() => {
    if (initialData) {
      reset({
        ...initialData,
        status: initialData.status ?? "active",
        rank: initialData.rank ?? "Bronze",
      });
    }
  }, [initialData, reset]);

  const onSubmit = (data: VolunteerFormValues) => {
    console.log("Updated Volunteer:", data);
    onClose();
  };

  return (
    <BaseModal isOpen={isOpen} onClose={onClose} title="Edit Volunteer">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-[#3d2b22] dark:text-zinc-100">
        <FormInput
          label="Full Name *"
          name="fullName"
          register={register}
          error={errors.fullName}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormInput
            label="Volunteer Code *"
            name="volunteerCode"
            register={register}
            error={errors.volunteerCode}
          />
          <FormSelect
            label="Status"
            name="status"
            control={control}
            options={[
              { value: "active", label: "Active" },
              { value: "pending", label: "Pending" },
            ]}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormSelect
            label="Division"
            name="division"
            control={control}
            options={[
              { value: "Dhaka", label: "Dhaka" },
              { value: "Chattogram", label: "Chattogram" },
              { value: "Rajshahi", label: "Rajshahi" },
              { value: "Khulna", label: "Khulna" },
              { value: "Barishal", label: "Barishal" },
              { value: "Sylhet", label: "Sylhet" },
              { value: "Rangpur", label: "Rangpur" },
              { value: "Mymensingh", label: "Mymensingh" },
            ]}
          />
          <FormSelect
            label="District *"
            name="district"
            control={control}
            options={[
              { value: "Dhaka", label: "Dhaka" },
              { value: "Gazipur", label: "Gazipur" },
              { value: "Narayanganj", label: "Narayanganj" },
              { value: "Manikganj", label: "Manikganj" },
              { value: "Tangail", label: "Tangail" },
              { value: "Faridpur", label: "Faridpur" },
              { value: "Chattogram", label: "Chattogram" },
              { value: "Cumilla", label: "Cumilla" },
              { value: "Noakhali", label: "Noakhali" },
              { value: "Cox's Bazar", label: "Cox's Bazar" },
              { value: "Rajshahi", label: "Rajshahi" },
              { value: "Khulna", label: "Khulna" },
              { value: "Sylhet", label: "Sylhet" },
            ]}
          />
          <FormInput
            label="Upazila"
            name="upazila"
            register={register}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <FormInput
            label="Members Recruited"
            name="membersRecruited"
            register={register}
          />
          <FormInput
            label="Performance Score"
            name="performanceScore"
            register={register}
          />
          <FormSelect
            label="Rank"
            name="rank"
            control={control}
            options={[
              { value: "Gold", label: "Gold" },
              { value: "Silver", label: "Silver" },
              { value: "Bronze", label: "Bronze" },
            ]}
          />
        </div>

        {/* ফুটার বাটনস */}
        <div className="flex justify-end gap-3 pt-4 border-t dark:border-zinc-800">
          <button 
            type="button" 
            onClick={onClose} 
            className="px-6 py-2 border border-gray-200 dark:border-zinc-700 rounded-xl text-sm font-medium hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors"
          >
            Cancel
          </button>
          <button 
            type="submit" 
            className="px-6 py-2 bg-[#00a389] hover:bg-[#008f77] dark:bg-[#00c4a5] dark:hover:bg-[#00a389] text-white text-sm font-semibold rounded-xl transition-colors"
          >
            Save Changes
          </button>
        </div>
      </form>
    </BaseModal>
  );
};

export default EditVolunteerModal;