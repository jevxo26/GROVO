"use client";

import React, { useState } from "react";
import { Check, Clock, Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

interface Activity {
  title: string;
  date: string;
  location: string;
  points?: number;
  status: "approved" | "pending";
}

interface FormData {
  type: string;
  description: string;
  location: string;
  date: string;
}

const schema: yup.ObjectSchema<FormData> = yup.object({
  type: yup.string().required("Activity type is required"),
  description: yup.string().required("Description is required"),
  location: yup.string().required("Location is required"),
  date: yup.string().required("Date is required"),
});

const activitiesData: Activity[] = [
  {
    title: "Registered 5 new members",
    date: "2026-07-09",
    location: "Dhaka",
    points: 50,
    status: "approved",
  },
  {
    title: "Monthly report",
    date: "2026-07-01",
    location: "Dhaka",
    points: 30,
    status: "pending",
  },
];

const activityTypes = [
  "Member Registration",
  "Donor Outreach",
  "Field Visit",
  "Campaign Support",
  "Photo Upload",
];

const Activities: React.FC = () => {
  const [showForm, setShowForm] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
    alert("Submitted ✅");
    reset();
    setShowForm(false);
  };

  // ✅ Cancel handler
  const handleCancel = () => {
    reset();
    setShowForm(false);
  };

  return (
    <div className="p-6 md:p-10 bg-gray-50 min-h-screen">

      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1>
          Total activities: <b>8</b> · Total points: <b>445</b>
        </h1>

        <button
          onClick={() => setShowForm(!showForm)}
          className="flex items-center gap-2 bg-[#009688] text-white px-4 py-2 rounded-lg"
        >
          <Plus size={18} />
          {showForm ? "Close Form" : "Submit Activity"}
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white p-8 rounded-2xl border shadow-sm max-w-4xl mx-auto mb-8"
        >
          <h2 className="text-lg font-bold mb-6">
            New Activity Report
          </h2>

          <div className="mb-4">
            <select {...register("type")} className="w-full p-3 border rounded-lg">
              <option value="">Select type...</option>
              {activityTypes.map((type) => (
                <option key={type}>{type}</option>
              ))}
            </select>
            <p className="text-red-500 text-xs">{errors.type?.message}</p>
          </div>

          <div className="mb-4">
            <textarea
              {...register("description")}
              className="w-full p-3 border rounded-lg h-24"
              placeholder="Describe..."
            />
            <p className="text-red-500 text-xs">{errors.description?.message}</p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <input
                {...register("location")}
                className="w-full p-3 border rounded-lg"
                placeholder="Location"
              />
              <p className="text-red-500 text-xs">{errors.location?.message}</p>
            </div>

            <div>
              <input
                type="date"
                {...register("date")}
                className="w-full p-3 border rounded-lg"
              />
              <p className="text-red-500 text-xs">{errors.date?.message}</p>
            </div>
          </div>

          {/* ✅ Buttons FIXED */}
          <div className="flex gap-4">
            <button
              type="submit"
              className="bg-[#009688] text-white px-6 py-2 rounded-lg"
            >
              Submit
            </button>

            <button
              type="button"
              onClick={handleCancel}
              className="px-6 py-2 border rounded-lg"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* List */}
      <div className="bg-white rounded-2xl border shadow-sm">
        {activitiesData.map((act, i) => (
          <div key={i} className="flex items-center gap-4 p-5 border-b">
            <div className={act.status === "approved" ? "text-green-600" : "text-orange-600"}>
              {act.status === "approved" ? <Check /> : <Clock />}
            </div>

            <div className="flex-1">
              <h3>{act.title}</h3>
              <p className="text-sm text-gray-500">
                {act.date} · {act.location}
              </p>
            </div>

            <div>
              <p className="font-bold text-[#009688]">
                +{act.points}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Activities;